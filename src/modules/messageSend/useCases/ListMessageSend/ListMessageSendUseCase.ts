import { MensagensSendRepository } from "../../repositories/MensagensSendRepository";

export class ListMessageSendUseCase {
  async execute() {
    const mensagensSendRepository = new MensagensSendRepository();
    const resultEvento = await mensagensSendRepository.ListAll();
    return resultEvento;
  }
}
