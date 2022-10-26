import { Request, Response } from "express";

import { UpdateSchemaUseCase } from "./UpdateSchemaUseCase";

class UpdateSchemaController {
  async handle(request: Request, response: Response) {
    const updateSchemaUseCase = new UpdateSchemaUseCase();
    const { event } = request.params;

    const result = await updateSchemaUseCase.execute(event);

    return response.json(result);
  }
}

export { UpdateSchemaController };
