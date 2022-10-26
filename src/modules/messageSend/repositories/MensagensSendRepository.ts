import { MsgProcessEnum, MSgStatusEnum } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";

interface IMessageSend {
  id?: string;
  codMsg: string;
  xmlMessage: string;
  process?: MsgProcessEnum;
  status?: MSgStatusEnum;
  error?: object[];
  dateRef?: Date;
  createdAt?: Date;
  updateAt?: Date;
}

class MensagensSendRepository {
  async create(message: IMessageSend) {
    const result = await prisma.messageSend.create({
      data: message,
    });
    return result;
  }

  async ListAll() {
    const result = await prisma.messageSend.findMany({
      take: 25,
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  }
}

export { MensagensSendRepository, IMessageSend };
