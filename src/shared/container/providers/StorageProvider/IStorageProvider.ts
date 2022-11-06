export interface IStorageProvider {
  // save(file: string, folder: string): Promise<string>;
  // delete(file: string, folder: string): Promise<void>;

  get(file: string, folder: string): Promise<string>;
}
