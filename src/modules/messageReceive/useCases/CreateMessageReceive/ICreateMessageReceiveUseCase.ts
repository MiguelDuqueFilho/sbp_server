import { MessageReceive } from "@prisma/client";

export interface ICreateMessageReceiveUseCase {
  execute(message: MessageReceive): Promise<MessageReceive>;
}
