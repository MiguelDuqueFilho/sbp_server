import { EventosRepository } from "../../../catalogs/repositories/EventosRepository";

export class GetMessageUseCase {
  async execute(CodEvento: string) {
    const eventosRepository = new EventosRepository();
    const resultEvento = await eventosRepository.GetEvent(CodEvento);
    return resultEvento;
  }
}
