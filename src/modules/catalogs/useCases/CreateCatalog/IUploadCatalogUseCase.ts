import { UploadedFile } from "express-fileupload";

export interface IUploadCatalogUseCase {
  execute(file: UploadedFile): Promise<object>;
}
