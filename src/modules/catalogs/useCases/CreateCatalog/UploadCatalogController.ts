import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCatalogUseCase } from "./UploadCatalogUseCase";

export class UploadCatalogController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const uploadCatalogUseCase = container.resolve(UploadCatalogUseCase);

    if (!file) {
      return response.status(400).json({ message: "No files were uploaded." });
    }

    const result = await uploadCatalogUseCase.execute(
      file as Express.Multer.File
    );

    return response.json(result);
  }
}
