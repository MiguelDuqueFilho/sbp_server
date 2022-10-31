import { inject, injectable } from "tsyringe";

import { IMensagensSendRepository } from "../../repositories/IMensagensSendRepository";
import { IListMessageSendUseCase } from "./IListMessageSendUseCase";

@injectable()
export class ListMessageSendUseCase implements IListMessageSendUseCase {
  constructor(
    @inject("MensagensSendRepository")
    private mensagensSendRepository: IMensagensSendRepository
  ) {}

  async execute() {
    const resultEvento = await this.mensagensSendRepository.ListAll();
    return resultEvento;
  }
}
