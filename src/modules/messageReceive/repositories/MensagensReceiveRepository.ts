import { MessageReceive } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";
import { IMensagensReceiveRepository } from "./IMensagensReceiveRepository";

export class MensagensReceiveRepository implements IMensagensReceiveRepository {
  async create(message: MessageReceive) {
    const result = await prisma.messageReceive.create({
      data: message,
    });
    return result;
  }
}
