import { inject, injectable } from "tsyringe";

import { IEventosRepository } from "../../repositories/IEventosRepository";
import { IUpdateSchemaUseCase } from "./IUpdateSchemaUseCase";
import { SchemaXSDConvert } from "./SchemaXSDConvert";

@injectable()
export class UpdateSchemaUseCase implements IUpdateSchemaUseCase {
  constructor(
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository
  ) {}

  async execute(event: string) {
    const schemaXSDConvert = new SchemaXSDConvert();
    const resultConvert = await schemaXSDConvert.execute(event);
    const { error } = resultConvert as any;
    if (error) {
      await this.eventosRepository.update(event, {
        IsConvert: false,
        EventJson: error,
      });
    } else {
      await this.eventosRepository.update(event, {
        IsConvert: true,
        EventJson: resultConvert,
      });
    }

    const resultServicos = await this.eventosRepository.list(event);
    return resultServicos;
  }
}
