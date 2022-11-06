export interface IUploadCatalogUseCase {
  execute(file: Express.Multer.File): Promise<object>;
}
