import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCatalogEventoUseCase } from "./ListCatalogEventoUseCase";

export class ListCatalogEventoController {
  async handle(request: Request, response: Response) {
    const listCatalogEventoUseCase = container.resolve(
      ListCatalogEventoUseCase
    );
    const { event } = request.params;

    const result = await listCatalogEventoUseCase.execute(event);

    return response.json(result);
  }
}
