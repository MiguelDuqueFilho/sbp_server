import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMessageSendUseCase } from "./ListMessageSendUseCase";

export class ListMessageSendController {
  async handle(request: Request, response: Response) {
    const listMessageSendUseCase = container.resolve(ListMessageSendUseCase);
    const result = await listMessageSendUseCase.execute();
    return response.json(result);
  }
}
