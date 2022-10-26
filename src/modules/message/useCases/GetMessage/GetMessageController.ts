import { Request, Response } from "express";

import { GetMessageUseCase } from "./GetMessageUseCase";

export class GetMessageController {
  async handle(request: Request, response: Response) {
    const { event } = request.params;
    const getMessageUseCase = new GetMessageUseCase();

    const result = await getMessageUseCase.execute(event);
    return response.json(result);
  }
}
