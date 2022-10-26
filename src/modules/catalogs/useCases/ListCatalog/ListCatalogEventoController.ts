import { Request, Response } from "express";

import { ListCatalogEventoUseCase } from "./ListCatalogEventoUseCase";

export class ListCatalogEventoController {
  async handle(request: Request, response: Response) {
    const listCatalogEventoUseCase = new ListCatalogEventoUseCase();
    const { event } = request.params;

    const result = await listCatalogEventoUseCase.execute(event);

    return response.json(result);
  }
}
