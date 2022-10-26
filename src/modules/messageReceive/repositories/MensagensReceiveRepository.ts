import { MsgProcessEnum, MSgStatusEnum } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";

interface IMessageReceive {
  id?: string;
  codMsg: string;
  xmlMessage: string;
  process: MsgProcessEnum;
  status: MSgStatusEnum;
  error?: object;
  dateRef?: Date;
  createdAt?: Date;
  updateAt?: Date;
}

class MensagensReceiveRepository {
  async create(message: IMessageReceive) {
    const result = await prisma.messageSend.create({
      data: message,
    });
    return result;
  }
}

export { MensagensReceiveRepository, IMessageReceive };
