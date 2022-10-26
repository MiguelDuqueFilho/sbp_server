import fs from "fs/promises";
import path from "path";

import { logger } from "../../../../../lib/logger";

async function compactObject(
  obj: any,
  stack: any = "",
  prevType = "",
  prevElement = ""
): Promise<any> {
  let resultObject: any = [];
  let PrevElementIterate: string = prevElement;
  /**
   * iterate object until the end
   */

  for (const property in obj) {
    if (Array.isArray(obj[property])) {
      logger.debug(
        `${prevElement} ${property} (L=${obj[property].length}) is an array  with parent ${prevType} ${stack}`
      );

      PrevElementIterate = property;
      if (obj[property].length !== 0) {
        const resultObjectlevel = await compactObject(
          obj[property],
          `${stack}${property}`,
          "array",
          PrevElementIterate
        );

        const resultElements = await elementsObjects(
          resultObjectlevel
          // "array",
          // PrevElementIterate
        );

        resultObject = {
          ...resultObject,
          [property]: resultElements,
        };
      }
    } else if (
      typeof obj[property] !== "string" &&
      typeof obj[property] !== "number"
    ) {
      if (prevType === "array") {
        logger.debug(
          `${prevElement} ${property} ${stack}[${property}] is an object, item of array ${stack}`
        );

        const resultObjectlevel = await compactObject(
          obj[property],
          `${stack}[${property}].`,
          "object",
          PrevElementIterate
        );

        const resultObjectOfArray = await objectOfArray(
          resultObjectlevel
          // "object",
          // PrevElementIterate
        );

        resultObject.push(resultObjectOfArray);
      } else {
        logger.debug(
          `${prevElement} ${property} ${stack}${property} is ${typeof obj[
            property
          ]} with parent ${prevType} ${stack}`
        );

        PrevElementIterate = property;

        const resultObjectlevel = await compactObject(
          obj[property],
          `${stack}${property}.`,
          "object",
          PrevElementIterate
        );

        resultObject = { ...resultObject, [property]: resultObjectlevel };
      }
    } else if (prevType === "array") {
      logger.debug(`${prevElement} ${property} = ${obj[property]} ${stack}`);
      resultObject = { ...resultObject, [property]: obj[property] };
    } else {
      logger.debug(`${prevElement} ${property} = ${obj[property]} ${stack}`);
      resultObject = { ...resultObject, [property]: obj[property] };
    }
  }
  return resultObject;
}

async function elementsObjects(
  obj: any
  // prevType = "",
  // prevElement: any = ""
): Promise<any> {
  let resultObject: any = [];
  let elementItem: any = [];
  const complexTypeItem: any = [];
  const simpleTypeItem: any = [];

  const { schema } = obj[0];
  if (!schema) return obj;

  const { xmlns, elements } = schema;

  /**
   * Level Down for DOC
   */
  elementItem = elements[0];
  /**
   * Create complex final
   */

  for (const property in elements) {
    const { complexType, simpleType } = elements[property];
    if (complexType) complexTypeItem.push({ ...complexType });
    if (simpleType) simpleTypeItem.push({ ...simpleType });
  }

  resultObject = {
    schema: {
      xmlns,
      element: elementItem,
      complexType: complexTypeItem,
      simpleType: simpleTypeItem,
    },
  };
  return resultObject;
}

async function objectOfArray(
  obj: any
  // prevType = "",
  // prevElement = ""
): Promise<any> {
  let resultObject: any = [];

  const { type, name, text, ...rest } = obj;

  switch (type) {
    // type swith
    case "text": {
      resultObject = { text };
      break;
    }
    case "element": {
      switch (name) {
        // name swith
        case "choice":
        case "sequence": {
          const { attributes, elements } = rest;
          resultObject = { [name]: { ...attributes, element: elements } };

          break;
        }
        case "schema": {
          const { attributes, ...elements } = rest;

          resultObject = { [name]: { ...attributes, ...elements } };
          break;
        }
        case "complexType": {
          const { attributes, elements } = rest;
          let elementsCompress: any = {};
          if (elements) {
            for (const x in elements) {
              const { element } = elements[x];
              if (element) {
                elementsCompress = { ...elementsCompress, ...element };
              } else {
                elementsCompress = { ...elementsCompress, ...elements[x] };
              }
            }
          }
          resultObject = { [name]: { ...attributes, ...elementsCompress } };
          break;
        }
        case "simpleType": {
          const { attributes, elements } = rest;
          let elementsCompress: any = {};
          if (elements) {
            for (const x in elements) {
              const { restriction } = elements[x];
              if (restriction) {
                elementsCompress = { ...elementsCompress, ...restriction };
              } else {
                elementsCompress = { ...elementsCompress, ...elements[x] };
              }
            }
          }
          resultObject = { [name]: { ...attributes, ...elementsCompress } };
          break;
        }
        case "element": {
          const { attributes, elements } = rest;

          let elementsCompress: any = {};
          if (elements) {
            for (const x in elements) {
              elementsCompress = { ...elementsCompress, ...elements[x] };
            }
          }

          resultObject = { ...attributes, ...elementsCompress };
          break;
        }
        case "Observacao":
        case "DescricaoTipo":
        case "NomeCampo":
        case "DescricaoCampo":
        case "Mensagem":
        case "Emissor":
        case "DescricaoRegra":
        case "CodigoRegra":
        case "TipoFluxo":
        case "Servico":
        case "Descricao":
        case "Evento": {
          const { elements } = rest;
          resultObject = { [name]: elements[0].text };
          break;
        }
        case "Destinatario": {
          const { elements } = rest;
          resultObject = { [name]: elements[0].text, tagRef: "Message" };
          break;
        }
        case "InfRegra": {
          const { elements } = rest;
          let regras = {};
          for (const r in elements) {
            regras = { ...regras, ...elements[r] };
          }
          resultObject = { [name]: regras };
          break;
        }
        case "InfEvento": {
          const { elements } = rest;
          let InfEvento = {};
          const infr = [];
          for (const r in elements) {
            const { InfRegra } = elements[r];
            if (InfRegra) {
              infr.push({ ...InfRegra });
            } else {
              InfEvento = { ...InfEvento, ...elements[r] };
            }
          }
          resultObject = { ...InfEvento, tagRef: "DOC", InfRegra: infr };
          break;
        }
        case "extension":
        case "simpleContent":
        case "InfTipo":
        case "InfCampo":
        case "InfMensagem":
        case "annotation":
        case "documentation": {
          const { elements } = rest;
          for (const r in elements) {
            resultObject = { ...resultObject, ...elements[r] };
          }
          break;
        }
        case "restriction": {
          const { attributes, ...elem } = rest;
          const { elements } = elem;
          let restrictionCompress: any = {};
          if (elements) {
            for (const x in elements) {
              restrictionCompress = { ...restrictionCompress, ...elements[x] };
            }
            resultObject = {
              [name]: { ...attributes, ...restrictionCompress },
            };
          }
          break;
        }
        case "attribute": {
          const { attributes } = rest;
          if (attributes) {
            resultObject = {
              [name]: { ...attributes },
            };
          }
          break;
        }
        default: {
          const { attributes } = rest;
          const { value } = attributes;
          resultObject = { [name]: value };
          break;
        }
      }
      break;
    }
    default: {
      logger.debug(`error: default for switch não pode ser acionado `);
      resultObject = obj;
      break;
    }
  }

  return resultObject;
}

/**
 * class TransformSchemaToCompactSchema
 */
export class JsonToCompactSchema {
  /**
   * Function transform json schema to compact schema
   * @param buffer schema from xsd em format json
   * @returns
   */
  async execute(buffer: object, event: string) {
    const objectDoc = await compactObject(buffer);

    if (process.env.LOG_LEVEL === "silly") {
      const serviceDomain = event.substring(0, 3);
      const schemaPathJson = path.resolve(
        "xsddoc",
        serviceDomain.toUpperCase(),
        `${event.toUpperCase()}_schema_compact.json`
      );
      await fs.writeFile(schemaPathJson, JSON.stringify(objectDoc), {
        encoding: "utf8",
      });
    }
    return objectDoc;
  }
}
