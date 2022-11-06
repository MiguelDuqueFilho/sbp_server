import { Evento, GrupoServico, Mensagem } from "@prisma/client";
import * as fs from "fs/promises";
import pdfParse from "pdf-parse";
import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../@config/uploadConfig";
import { logger } from "../../../../lib/logger";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { IEventosRepository } from "../../repositories/IEventosRepository";
import { IGrupoServicosRepository } from "../../repositories/IGrupoServicosRepository";
import { IMensagensRepository } from "../../repositories/IMensagensRepository";
import { IUploadCatalogUseCase } from "./IUploadCatalogUseCase";

/**
 * * seleciona no pdf o Grupo de Serviço
 */
const regexGrupoServico = /(Grupo de Serviços) ([A-Z]{3}) (?!.)+/g;

/**
 * * seleciona no pdf o O Domínio do Sistema
 */
const regexDominio =
  /(Este grupo de serviços pertence ao domínio de sistema) ([A-Z0-9]*)/g;

/**
 * * seleciona Evento
 */
const regexEvento = /Evento ([A-Z]{3}[0-9]{4})( - )([A-za-z0-9\S ]+)/;

/**
 * * seleciona descrição da mensagem
 */
const regexMensagem = /(?<!Código )(Mensagem: )([A-za-z0-9\S ]+)/g;

/**
 * * seleciona Código da mensagem
 */
const regexCodigoMensagem =
  /(Código Mensagem: )([A-Z]{3}[0-9]{4}E{0,1}R{0,1}[ 123]{0,1})( Emissor:)([ A-Za-z0-9á_çãõâ\S]+)([ +]{0,})(Destinatário:)([ A-Za-z0-9á_çãõâ\S]+)/;

/**
 * * seleciona Fluxo do Evento
 */
const regexEventoFluxo =
  /Mensagens Associadas Fluxo do Evento: ([A-za-z0-9\S]+)/g;

let startArqReference = false;
let lineReference = 0;
let cadServicos = [] as GrupoServico[];
let cadEventos = [] as Evento[];
let cadMensagens = [] as Mensagem[];

let cadServico = {} as GrupoServico;
let cadEvento = {} as Evento;
let cadMensagem = {} as Mensagem;

async function ProcessCatalogItoIII(line: string, index: number) {
  /**
   * *  get group service
   */
  if (line.match(regexGrupoServico)) {
    const parseText = <string[]>regexGrupoServico.exec(line);
    const [, , GrpServico] = parseText;
    cadServico = { GrpServico } as any;
    lineReference = index + 2;
    startArqReference = true;
    return;
  }

  if (!startArqReference) return;

  /**
   * *  get Service Descricao
   */
  if (lineReference === index) {
    cadServico = { ...cadServico, Descricao: line };
    return;
  }

  /**
   * * get Dominio
   */
  if (line.match(regexDominio)) {
    const parseText = <string[]>regexDominio.exec(line);
    const [, , Dominio] = parseText;
    cadServico = { ...cadServico, Dominio };
    cadEvento = { GrpServicoId: cadServico.GrpServico } as any;
    cadServicos = [...cadServicos, cadServico];
    return;
  }

  /**
   * * get Evento
   */
  if (line.match(regexEvento)) {
    const parseText = <string[]>regexEvento.exec(line);
    const [, CodEvento, , NomeEvento] = parseText;
    cadEvento = {
      ...cadEvento,
      CodEvento,
      NomeEvento,
    };
    return;
  }

  /**
   * * get Evento
   */
  if (line.match(regexEventoFluxo)) {
    const parseText = <string[]>regexEventoFluxo.exec(line);
    const [, Fluxo] = parseText;
    cadEvento = { ...cadEvento, Fluxo };
    cadEventos = [...cadEventos, cadEvento];
    return;
  }

  /**
   * * get Mensagem
   */
  if (line.match(regexMensagem)) {
    const parseText = <string[]>regexMensagem.exec(line);
    const [, , Descricao] = parseText;
    cadMensagem = { CodEventoId: cadEvento.CodEvento, Descricao } as any;
    return;
  }

  /**
   * * get Cod Mensagem
   */
  if (line.match(regexCodigoMensagem)) {
    const parseText = <string[]>regexCodigoMensagem.exec(line);
    const [, , CodMsg, , EntidadeOrigem, , , EntidadeDestino] = parseText;

    cadMensagem = {
      ...cadMensagem,
      CodMsg,
      Tag: `<${CodMsg.trim()}>`,
      EntidadeOrigem: EntidadeOrigem.trim(),
      EntidadeDestino: EntidadeDestino.trim(),
    };
    cadMensagens = [...cadMensagens, cadMensagem];
  }
}
@injectable()
export class UploadCatalogUseCase implements IUploadCatalogUseCase {
  constructor(
    @inject("GrupoServicosRepository")
    private grupoServicosRepository: IGrupoServicosRepository,
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository,
    @inject("MensagensRepository")
    private mensagensRepository: IMensagensRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute(file: Express.Multer.File) {
    logger.debug(`Arquivo upload ${file.originalname}`);

    try {
      const buffer = await fs.readFile(file.path);

      const data = await pdfParse(buffer);

      // process lines
      const lines = data.text.split(/\r?\n/);

      lines.forEach(async (line, index) => {
        /**
         * * ignore line empty fo pdf
         */
        if (line.trim() === "") return;

        await ProcessCatalogItoIII(line, index);
      });

      const resultServicos = await this.grupoServicosRepository.createMany(
        cadServicos
      );

      const resultEvento = await this.eventosRepository.createMany(cadEventos);

      const resultMensagem = await this.mensagensRepository.createMany(
        cadMensagens
      );

      deleteFile(file.originalname);

      return {
        info: data.info.Title,
        author: data.info.Author,
        pages: data.numpages,
        servicos: resultServicos.count,
        eventos: resultEvento.count,
        mensagens: resultMensagem.count,
      };
    } catch (error) {
      throw new Error(`Error carregando o arquivo ${file.originalname}`);
    }
  }
}
