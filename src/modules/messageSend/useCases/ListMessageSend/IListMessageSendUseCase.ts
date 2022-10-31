import { MessageSend } from "@prisma/client";

export interface IListMessageSendUseCase {
  execute(): Promise<MessageSend[]>;
}
