import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCatalogServicoUseCase } from "./ListCatalogServicoUseCase";

export class ListCatalogServicoController {
  async handle(request: Request, response: Response) {
    const listCatalogServicoUseCase = container.resolve(
      ListCatalogServicoUseCase
    );

    const result = await listCatalogServicoUseCase.execute();

    return response.json(result);
  }
}
