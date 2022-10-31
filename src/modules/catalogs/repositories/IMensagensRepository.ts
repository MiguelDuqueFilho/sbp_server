import { Mensagem, Prisma } from "@prisma/client";

export interface IMensagensRepository {
  createMany(mensagens: Mensagem[]): Promise<Prisma.BatchPayload>;
}
