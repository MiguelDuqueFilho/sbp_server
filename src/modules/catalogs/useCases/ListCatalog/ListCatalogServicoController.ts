import { Request, Response } from "express";

import { ListCatalogServicoUseCase } from "./ListCatalogServicoUseCase";

export class ListCatalogServicoController {
  async handle(request: Request, response: Response) {
    const listCatalogServicoUseCase = new ListCatalogServicoUseCase();

    const result = await listCatalogServicoUseCase.execute();

    return response.json(result);
  }
}
