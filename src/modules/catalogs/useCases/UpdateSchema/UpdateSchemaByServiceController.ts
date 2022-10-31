import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSchemaByServiceUseCase } from "./UpdateSchemaByServiceUseCase";

export class UpdateSchemaByServiceController {
  async handle(request: Request, response: Response) {
    const updateSchemaByServiceUseCase = container.resolve(
      UpdateSchemaByServiceUseCase
    );
    const { service } = request.params;

    const result = await updateSchemaByServiceUseCase.execute(service);

    return response.json(result);
  }
}
