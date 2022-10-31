import { inject, injectable } from "tsyringe";

import { IEventosRepository } from "../../../catalogs/repositories/IEventosRepository";
import { IGetMessageUseCase } from "./IGetMessageUseCase";

@injectable()
export class GetMessageUseCase implements IGetMessageUseCase {
  constructor(
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository
  ) {}

  async execute(CodEvento: string) {
    const resultEvento = await this.eventosRepository.getEvent(CodEvento);
    return resultEvento;
  }
}
