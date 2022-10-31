import { MessageSend, Prisma } from "@prisma/client";

export interface IMensagensSendRepository {
  create(message: Prisma.MessageSendCreateInput): Promise<MessageSend>;
  ListAll(): Promise<MessageSend[]>;
}
