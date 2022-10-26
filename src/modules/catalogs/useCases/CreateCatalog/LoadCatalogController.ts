import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { LoadCatalogUseCase } from "./LoadCatalogUseCase";

export class LoadCatalogController {
  async handle(request: Request, response: Response) {
    const loadCatalogUseCase = new LoadCatalogUseCase();

    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).json({ message: "No files were uploaded." });
    }

    const { file } = request.files;

    const result = await loadCatalogUseCase.execute(file as UploadedFile);

    return response.json(result);
  }
}
