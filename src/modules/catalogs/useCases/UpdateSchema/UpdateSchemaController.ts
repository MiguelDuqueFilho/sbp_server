import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSchemaUseCase } from "./UpdateSchemaUseCase";

export class UpdateSchemaController {
  async handle(request: Request, response: Response) {
    const updateSchemaUseCase = container.resolve(UpdateSchemaUseCase);
    const { event } = request.params;

    const result = await updateSchemaUseCase.execute(event);

    return response.json(result);
  }
}
