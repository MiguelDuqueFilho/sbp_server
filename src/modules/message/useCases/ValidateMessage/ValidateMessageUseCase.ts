import fs from "fs";
import libxmljs from "libxmljs2";
import path from "path";

import { IValidateMessageUseCase } from "./IValidateMessageUseCase";

async function loadXmlSchema(filename: string) {
  const serviceDomain = filename.substring(0, 3);
  const schemaPath = path.resolve(
    "xsddoc",
    serviceDomain.toUpperCase(),
    `${filename.toUpperCase()}.XSD`
  );

  const schemaText = fs.readFileSync(schemaPath, "latin1");

  return libxmljs.parseXml(schemaText);
}

export class ValidateMessageUseCase implements IValidateMessageUseCase {
  async execute(event: string, xmlData: string) {
    const xmlDoc = libxmljs.parseXml(xmlData, {} as libxmljs.ParserOptions);

    const xmlSchemaDoc = await loadXmlSchema(event);

    const validationResult = xmlDoc.validate(xmlSchemaDoc);

    if (validationResult) {
      let codMsg = event;
      const regex1 = /(<CodMsg>)([A-Z]{3}[0-9]{4}(E|R1|R2|R3)?)(<\/CodMsg>)/;
      const regex2 = /(<CodMsg>)([^]+)(<\/CodMsg>)/;

      if (regex1.test(xmlData)) {
        const regexArray = regex2.exec(xmlData);
        codMsg = regexArray[2];
      }

      return {
        codMsg,
        message: `Event: ${event} Validation Successful`,
      };
    }
    return {
      codMsg: event,
      error: xmlDoc.validationErrors,
    };
  }
}
