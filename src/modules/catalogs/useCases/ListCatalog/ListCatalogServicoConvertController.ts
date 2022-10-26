import { Request, Response } from "express";

import { ListCatalogServicoConvertUseCase } from "./ListCatalogServicoConvertUseCase";

export class ListCatalogServicoConvertController {
  async handle(request: Request, response: Response) {
    const listCatalogServicoConvertUseCase =
      new ListCatalogServicoConvertUseCase();

    const result = await listCatalogServicoConvertUseCase.execute();

    return response.json(result);
  }
}
