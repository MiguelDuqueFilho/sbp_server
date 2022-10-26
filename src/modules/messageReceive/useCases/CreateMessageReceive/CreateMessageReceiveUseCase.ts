import {
  IMessageReceive,
  MensagensReceiveRepository,
} from "../../repositories/MensagensReceiveRepository";

export class CreateMessageReceiveUseCase {
  async execute(message: IMessageReceive) {
    const mensagensReceiveRepository = new MensagensReceiveRepository();
    const resultEvento = await mensagensReceiveRepository.create(message);
    return resultEvento;
  }
}
