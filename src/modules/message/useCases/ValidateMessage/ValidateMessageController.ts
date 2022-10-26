import { NextFunction, Request, Response } from "express";

import { ValidateMessageUseCase } from "./ValidateMessageUseCase";

export class ValidateMessageController {
  async handle(request: Request, response: Response, _next: NextFunction) {
    const validateMessageUseCase = new ValidateMessageUseCase();
    const xmlData = request.rawBody;
    const { event } = request.params;

    const result = await validateMessageUseCase.execute(event, xmlData);

    return response.json(result);
  }
}
