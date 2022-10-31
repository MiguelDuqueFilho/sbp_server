import { logger } from "../../../../../lib/logger";

function searchItemSimpleType(obj: any, searchName: string): Promise<any> {
  let buffer: any = {};

  for (const property in obj) {
    const { name, ...rest } = obj[property];
    logger.debug(
      `searching ==== Simple ====== name ${name}, type ${searchName}`
    );

    if (name === searchName) {
      logger.debug(
        `search ==== Simple ====== name ${name}, type ${searchName}`
      );

      buffer = rest;
      break;
    }
  }
  return buffer;
}

function searchItemComplexType(obj: any, searchName: string): Promise<any> {
  let buffer: any = {};

  for (const property in obj) {
    const { name, ...rest } = obj[property];
    logger.debug(
      `searching ==== Complex ====== name ${name}, type ${searchName}`
    );

    if (name === searchName) {
      logger.debug(
        `search ==== Complex ====== name ${name}, type ${searchName}`
      );

      buffer = rest;
      break;
    }
  }
  return buffer;
}

function completeSchema(
  obj: any,
  complexType: any,
  simpleType: any,
  stack: any = "",
  prevItem = "element",
  prevType = "object"
): Promise<any> {
  let result: any = [];
  let sequence = 0;

  for (const property in obj) {
    if (Array.isArray(obj[property])) {
      logger.debug(
        `${property} (L=${obj[property].length}) is an array with parent ${prevType} - ${stack}`
      );

      const resultIsArray = completeSchema(
        obj[property],
        complexType,
        simpleType,
        stack,
        // stack + property,
        property,
        "array"
      );

      result = { ...result, [property]: resultIsArray };
    } else if (
      typeof obj[property] !== "string" &&
      typeof obj[property] !== "number"
    ) {
      if (prevType === "array") {
        logger.debug(`${property} is an object, item of array - ${stack}`);

        /**
         * format xml stack for client web
         */
        let objProperty = obj[property];
        const { name, type } = obj[property];

        if (name && type) {
          objProperty = {
            ...obj[property],
            xmlStack: `${stack}.${sequence}.${name}`,
          };
        }

        const resultPrevArray = completeSchema(
          objProperty,
          complexType,
          simpleType,
          `${stack}.${sequence}.${name}`,
          prevItem,
          "object"
        );

        if (name && type) {
          sequence += 1;
        }

        result.push(resultPrevArray);
      } else {
        logger.debug(
          `${property} is typeof obj[property] with parent ${prevType} - ${stack}`
        );

        const resultPrevObject = completeSchema(
          obj[property],
          complexType,
          simpleType,
          stack,
          property,
          "object"
        );

        result = { ...result, [property]: resultPrevObject };
      }
    } else if (prevType === "array") {
      logger.debug(`Array ${stack}[${property}] =  ${obj[property]}`);

      result = { ...result, ...obj[property] };
    } else {
      logger.debug(`Object ${stack}${property} =  ${obj[property]}`);

      result = { ...result, [property]: obj[property] };
    }
  }

  /** ini novo codigo esperimental */
  const { name, type, childRef } = result;

  if (prevItem === "element" || prevItem === "attribute") {
    if (childRef) {
      if (childRef === "complexType") {
        logger.debug(
          `Final Rotina searchedComplexType with (${name}, ${type})`
        );

        const searchedComplexType = searchItemComplexType(complexType, type);

        const resultChild = completeSchema(
          searchedComplexType,
          complexType,
          simpleType,
          stack,
          "element",
          ""
        );
        result = { ...result, ...resultChild };
      }

      if (childRef === "simpleType") {
        logger.debug(
          `Final Rotina searchItemComplexType with (${name}, ${type})`
        );

        const searchedSimpleType = searchItemSimpleType(simpleType, type);

        const resultChild = completeSchema(
          searchedSimpleType,
          complexType,
          simpleType,
          stack,
          "element",
          ""
        );
        result = { ...result, ...resultChild };
      }
    }
  }
  /** fim novo codigo esperimental */

  return result;
}

/**
 * class CompleteSchemaWithComplexTypeAndSimpleType
 */
export class CompleteSchemaWithComplexTypeAndSimpleType {
  /**
   *
   * @param buffer
   * @param msg
   * @returns
   */
  async execute(buffer: any, msg: string) {
    let result = {};

    const { elements } = buffer;
    const { schema } = elements;
    const { xmlns, element, complexType, simpleType } = schema;
    if (elements && schema && element && complexType && simpleType) {
      result = await completeSchema(element, complexType, simpleType, "DOC");
    } else {
      logger.error(`Erro processando de completar o schema ${msg}`);
      result = { error: `erro processando de completar o schema ${msg}` };
    }
    result = { schema: { xmlns, element: result } };
    return result;
  }
}
