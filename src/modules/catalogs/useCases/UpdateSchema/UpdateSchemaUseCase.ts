import { EventosRepository } from "../../repositories/EventosRepository";
import { SchemaXSDConvert } from "./SchemaXSDConvert";

export class UpdateSchemaUseCase {
  async execute(event: string) {
    const schemaXSDConvert = new SchemaXSDConvert();
    const eventosRepository = new EventosRepository();

    const resultConvert = await schemaXSDConvert.execute(event);
    const { error } = resultConvert;
    if (error) {
      await eventosRepository.update(event, {
        IsConvert: false,
        EventJson: error,
      });
    } else {
      await eventosRepository.update(event, {
        IsConvert: true,
        EventJson: resultConvert,
      });
    }

    const resultServicos = await eventosRepository.list(event);
    return resultServicos;
  }
}
