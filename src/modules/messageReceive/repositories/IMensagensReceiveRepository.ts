import { MessageReceive } from "@prisma/client";

export interface IMensagensReceiveRepository {
  create(message: MessageReceive): Promise<MessageReceive>;
}
