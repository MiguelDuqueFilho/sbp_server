import { inject, injectable } from "tsyringe";

import { IEventosRepository } from "../../repositories/IEventosRepository";
import { IListCatalogEventoUseCase } from "./IListCatalogEventoUseCase";

@injectable()
export class ListCatalogEventoUseCase implements IListCatalogEventoUseCase {
  constructor(
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository
  ) {}

  async execute(event: string) {
    const resultEvento = await this.eventosRepository.list(event);
    return resultEvento;
  }
}
