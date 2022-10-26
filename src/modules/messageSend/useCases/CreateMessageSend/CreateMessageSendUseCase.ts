import { MsgProcessEnum, MSgStatusEnum } from "@prisma/client";

import { ValidateMessageUseCase } from "../../../message/useCases/ValidateMessage/ValidateMessageUseCase";
import {
  IMessageSend,
  MensagensSendRepository,
} from "../../repositories/MensagensSendRepository";

export class CreateMessageSendUseCase {
  async execute(event: string, xmlMessage: string) {
    const mensagensSendRepository = new MensagensSendRepository();
    const validateMessageUseCase = new ValidateMessageUseCase();

    const resultValidate = await validateMessageUseCase.execute(
      event,
      xmlMessage
    );

    let dataList: IMessageSend;

    const { error } = resultValidate;

    if (error) {
      dataList = {
        codMsg: resultValidate.codMsg,
        xmlMessage,
        error: resultValidate.error,
        process: MsgProcessEnum.DISABLE,
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

    const resultEvento = await mensagensSendRepository.create(dataList);
    return resultEvento;
  }
}
