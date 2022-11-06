import { inject, injectable } from "tsyringe";

import { IEventosRepository } from "../../repositories/IEventosRepository";
import { IListCatalogEventoByServiceUseCase } from "./IListCatalogEventoByServiceUseCase";

@injectable()
export class ListCatalogEventoByServiceUseCase
  implements IListCatalogEventoByServiceUseCase
{
  constructor(
    @inject("EventosRepository")
    private eventosRepository: IEventosRepository
  ) {}
  async execute(service: string) {
    const resultEvento = await this.eventosRepository.listByService(service);
    return resultEvento;
  }
}
