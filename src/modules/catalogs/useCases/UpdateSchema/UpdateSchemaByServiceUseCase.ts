import { inject, injectable } from "tsyringe";

import { IEventosRepository } from "../../repositories/IEventosRepository";
import { IGrupoServicosRepository } from "../../repositories/IGrupoServicosRepository";
import { IUpdateSchemaByServiceUseCase } from "./IUpdateSchemaByServiceUseCase";
import { SchemaXSDConvert } from "./SchemaXSDConvert";

@injectable()
export class UpdateSchemaByServiceUseCase
  implements IUpdateSchemaByServiceUseCase
{
  constructor(
    @inject("GrupoServicosRepository")
    private grupoServicosRepository: IGrupoServicosRepository,
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository
  ) {}
  async execute(service: string) {
    const schemaXSDConvert = new SchemaXSDConvert();
    const resultServicos = await this.grupoServicosRepository.listService(
      service
    );
    const { Eventos } = resultServicos;
    let count = 0;

    Eventos.forEach(async (event) => {
      const resultConvert = await schemaXSDConvert.execute(event.CodEvento);

      const evento = await this.eventosRepository.update(event.CodEvento, {
        IsConvert: true,
        EventJson: resultConvert,
      });

      if (!evento.IsConvert) count += 1;
    });

    return { count };
  }
}
