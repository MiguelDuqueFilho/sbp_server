import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMessageReceiveUseCase } from "./CreateMessageReceiveUseCase";

export class CreateMessageReceiveController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    const createMessageReceiveUseCase = container.resolve(
      CreateMessageReceiveUseCase
    );

    const result = await createMessageReceiveUseCase.execute(message);
    return response.json(result);
  }
}
