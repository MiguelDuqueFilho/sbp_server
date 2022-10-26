import { Request, Response } from "express";

import { ListMessageSendUseCase } from "./ListMessageSendUseCase";

export class ListMessageSendController {
  async handle(request: Request, response: Response) {
    const listMessageSendUseCase = new ListMessageSendUseCase();
    const result = await listMessageSendUseCase.execute();
    return response.json(result);
  }
}
