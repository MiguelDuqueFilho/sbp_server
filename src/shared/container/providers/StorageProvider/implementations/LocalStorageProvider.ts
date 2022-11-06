import fs from "fs";
import { resolve, extname } from "path";

import { tmpFolder } from "../../../../../@config/uploadConfig";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async get(file: string): Promise<string> {
    const originalName = resolve(tmpFolder, file);
    let fileContent = "";

    if (extname(file) === ".XSD") {
      fileContent = fs.readFileSync(originalName, "latin1").toString();
      return fileContent;
    }
    fileContent = fs.readFileSync(originalName).toString();
    return fileContent;
  }
}
