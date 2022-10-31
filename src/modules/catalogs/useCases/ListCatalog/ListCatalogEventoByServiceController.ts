import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCatalogEventoByServiceUseCase } from "./ListCatalogEventoByServiceUseCase";

export class ListCatalogEventoByServiceController {
  async handle(request: Request, response: Response) {
    const listCatalogEventoByServiceUseCase = container.resolve(
      ListCatalogEventoByServiceUseCase
    );
    const { service } = request.params;

    const result = await listCatalogEventoByServiceUseCase.execute(service);

    return response.json(result);
  }
}
