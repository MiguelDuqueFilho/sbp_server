import { EventosRepository } from "../../repositories/EventosRepository";
import { GrupoServicosRepository } from "../../repositories/GrupoServicosRepository";
import { SchemaXSDConvert } from "./SchemaXSDConvert";

export class UpdateSchemaByServiceUseCase {
  async execute(service: string) {
    const grupoServicosRepository = new GrupoServicosRepository();
    const schemaXSDConvert = new SchemaXSDConvert();
    const eventosRepository = new EventosRepository();

    const resultServicos = await grupoServicosRepository.listService(service);
    const { Eventos } = resultServicos;

    Eventos.forEach(async (event) => {
      const resultConvert = await schemaXSDConvert.execute(event.CodEvento);
      const { error } = resultConvert;
      if (error) {
        await eventosRepository.update(event.CodEvento, {
          IsConvert: false,
          EventJson: error,
        });
      } else {
        await eventosRepository.update(event.CodEvento, {
          IsConvert: true,
          EventJson: resultConvert,
        });
      }
    });

    const resultServicosAll = await grupoServicosRepository.listAll();
    return resultServicosAll;
  }
}
