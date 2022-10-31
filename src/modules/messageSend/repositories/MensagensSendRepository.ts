import { MessageSend } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";
import { IMensagensSendRepository } from "./IMensagensSendRepository";

export class MensagensSendRepository implements IMensagensSendRepository {
  async create(message: MessageSend) {
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
