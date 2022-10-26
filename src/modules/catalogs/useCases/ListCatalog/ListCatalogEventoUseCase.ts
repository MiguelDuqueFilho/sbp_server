import { EventosRepository } from "../../repositories/EventosRepository";

export class ListCatalogEventoUseCase {
  async execute(event: string) {
    const eventosRepository = new EventosRepository();
    const resultEvento = await eventosRepository.list(event);
    return resultEvento;
  }
}
