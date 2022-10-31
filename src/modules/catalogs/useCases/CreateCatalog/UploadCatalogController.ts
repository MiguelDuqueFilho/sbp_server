import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { container } from "tsyringe";

import { UploadCatalogUseCase } from "./UploadCatalogUseCase";

export class UploadCatalogController {
  async handle(request: Request, response: Response) {
    const { file } = request.files;

    const uploadCatalogUseCase = container.resolve(UploadCatalogUseCase);

    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).json({ message: "No files were uploaded." });
    }

    const result = await uploadCatalogUseCase.execute(file as UploadedFile);

    return response.json(result);
  }
}
