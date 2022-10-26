import { Request, Response } from "express";

import { CreateMessageSendUseCase } from "./CreateMessageSendUseCase";

export class CreateMessageSendController {
  async handle(request: Request, response: Response) {
    const { codMsg } = request.params;
    const xmlMessage: string = request.rawBody;

    const createMessageSendUseCase = new CreateMessageSendUseCase();

    const result = await createMessageSendUseCase.execute(codMsg, xmlMessage);
    return response.json(result);
  }
}
