import { logger } from "../../../../lib/logger";
import { CompleteSchemaWithComplexTypeAndSimpleType } from "./SchemaXSD/CompleteSchemaWithComplexTypeAndSimpleType";
import { JsonToCompactSchema } from "./SchemaXSD/JsonToCompactSchema";
import { TransformXslToJson } from "./SchemaXSD/TransformXslToJson";

export class SchemaXSDConvert {
  /**
   * * transform schema xml to object for client web
   */
  async execute(event: string) {
    const transformXslToJson = new TransformXslToJson();
    const jsonToCompactSchema = new JsonToCompactSchema();
    const completeSchemaWithComplexTypeAndSimpleType =
      new CompleteSchemaWithComplexTypeAndSimpleType();

    try {
      /**
       * * transform schema xsd to json
       */
      const bufferJson: any = await transformXslToJson.execute(event);
      /**
       * * compact json for each element the schema xsd
       */
      const bufferCompact = await jsonToCompactSchema.execute(
        bufferJson,
        event
      );
      /**
       * * for each element the message complete with complex and simple type
       */
      const result: any =
        await completeSchemaWithComplexTypeAndSimpleType.execute(
          bufferCompact,
          event
        );

      return {
        xmlns: result.schema.xmlns,
        schema: result.schema,
      };
    } catch (error: any) {
      logger.error(
        `Error módulo ConvertXslController na transformação do xml para Json da mensagem: ${event} ${error.message}.`
      );
      return {
        CodEvento: event,
        error: `Error módulo ConvertXslController na transformação do xml para Json da mensagem: ${event}.`,
      };
    }
  }
}
