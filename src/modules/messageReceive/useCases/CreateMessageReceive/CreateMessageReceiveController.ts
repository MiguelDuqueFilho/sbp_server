import { Request, Response } from "express";

import { CreateMessageReceiveUseCase } from "./CreateMessageReceiveUseCase";

export class CreateMessageReceiveController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    const createMessageReceiveUseCase = new CreateMessageReceiveUseCase();

    const result = await createMessageReceiveUseCase.execute(message);
    return response.json(result);
  }
}
