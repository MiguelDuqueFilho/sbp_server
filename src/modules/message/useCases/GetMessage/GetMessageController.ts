import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetMessageUseCase } from "./GetMessageUseCase";

export class GetMessageController {
  async handle(request: Request, response: Response) {
    const { event } = request.params;

    const getMessageUseCase = container.resolve(GetMessageUseCase);

    const result = await getMessageUseCase.execute(event);
    return response.json(result);
  }
}
