import { MsgProcessEnum, MSgStatusEnum, Prisma } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ValidateMessageUseCase } from "../../../message/useCases/ValidateMessage/ValidateMessageUseCase";
import { IMensagensSendRepository } from "../../repositories/IMensagensSendRepository";
import { ICreateMessageSendUseCase } from "./ICreateMessageSendUseCase";

@injectable()
export class CreateMessageSendUseCase implements ICreateMessageSendUseCase {
  constructor(
    @inject("MensagensSendRepository")
    private mensagensSendRepository: IMensagensSendRepository
  ) {}

  async execute(event: string, xmlMessage: string) {
    const validateMessageUseCase = new ValidateMessageUseCase();

    const resultValidate = await validateMessageUseCase.execute(
      event,
      xmlMessage
    );

    let dataList: Prisma.MessageSendCreateInput;

    const { error } = resultValidate;

    if (error) {
      dataList = {
        codMsg: resultValidate.codMsg,
        xmlMessage,
        error: resultValidate.error as unknown as Prisma.JsonValue,
        process: MsgProcessEnum.PENDING,
        status: MSgStatusEnum.ERROR,
      };
    } else {
      dataList = {
        codMsg: resultValidate.codMsg,
        xmlMessage,
        error: [],
        process: MsgProcessEnum.PENDING,
        status: MSgStatusEnum.VALIDATE,
      };
    }

    const resultEvento = await this.mensagensSendRepository.create(dataList);
    return resultEvento;
  }
}
