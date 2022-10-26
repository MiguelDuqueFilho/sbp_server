import { Request, Response } from "express";

import { UpdateSchemaByServiceUseCase } from "./UpdateSchemaByServiceUseCase";

export class UpdateSchemaByServiceController {
  async handle(request: Request, response: Response) {
    const updateSchemaByServiceUseCase = new UpdateSchemaByServiceUseCase();
    const { service } = request.params;

    const result = await updateSchemaByServiceUseCase.execute(service);

    return response.json(result);
  }
}
