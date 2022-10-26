import { EventosRepository } from "../../repositories/EventosRepository";

export class ListCatalogEventoByServiceUseCase {
  async execute(service: string) {
    const eventosRepository = new EventosRepository();
    const resultEvento = await eventosRepository.listByService(service);
    return resultEvento;
  }
}
