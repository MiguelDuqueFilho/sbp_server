import { MessageReceive } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IMensagensReceiveRepository } from "../../repositories/IMensagensReceiveRepository";

@injectable()
export class CreateMessageReceiveUseCase {
  constructor(
    @inject("MensagensReceiveRepository")
    private mensagensReceiveRepository: IMensagensReceiveRepository
  ) {}
  async execute(message: MessageReceive) {
    const resultEvento = await this.mensagensReceiveRepository.create(message);
    return resultEvento;
  }
}
