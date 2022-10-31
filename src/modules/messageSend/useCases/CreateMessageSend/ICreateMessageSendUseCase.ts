import { MessageSend } from "@prisma/client";

export interface ICreateMessageSendUseCase {
  execute(event: string, xmlMessage: string): Promise<MessageSend>;
}
