import { Mensagem } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";
import { IMessagensRepository } from "./IMensagensRepository";

export class MensagensRepository implements IMessagensRepository {
  async createMany(mensagens: Mensagem[]) {
    const result = await prisma.mensagem.createMany({
      data: mensagens as [],
      skipDuplicates: true,
    });
    return result;
  }
}
