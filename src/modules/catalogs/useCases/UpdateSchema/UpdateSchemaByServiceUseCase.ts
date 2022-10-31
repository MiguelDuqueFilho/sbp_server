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

    Eventos.forEach(async (event) => {
      const resultConvert = await schemaXSDConvert.execute(event.CodEvento);
      const { error } = resultConvert as any;
      if (error) {
        await this.eventosRepository.update(event.CodEvento, {
          IsConvert: false,
          EventJson: error,
        });
      } else {
        await this.eventosRepository.update(event.CodEvento, {
          IsConvert: true,
          EventJson: resultConvert,
        });
      }
    });

    const resultServicosAll = await this.grupoServicosRepository.listAll();
    return resultServicosAll;
  }
}
