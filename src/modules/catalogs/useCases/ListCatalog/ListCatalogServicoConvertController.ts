import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCatalogServicoConvertUseCase } from "./ListCatalogServicoConvertUseCase";

export class ListCatalogServicoConvertController {
  async handle(request: Request, response: Response) {
    const listCatalogServicoConvertUseCase = container.resolve(
      ListCatalogServicoConvertUseCase
    );

    const result = await listCatalogServicoConvertUseCase.execute();

    return response.json(result);
  }
}
