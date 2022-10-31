import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  save(file: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  delete(file: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
