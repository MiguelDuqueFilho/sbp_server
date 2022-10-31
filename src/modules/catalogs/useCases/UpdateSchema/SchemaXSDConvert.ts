import { logger } from "../../../../lib/logger";
import { ISchemaXSDConvert } from "./ISchemaXSDConvert";
import { CompleteSchemaWithComplexTypeAndSimpleType } from "./SchemaXSD/CompleteSchemaWithComplexTypeAndSimpleType";
import { JsonToCompactSchema } from "./SchemaXSD/JsonToCompactSchema";
import { TransformXslToJson } from "./SchemaXSD/TransformXslToJson";

export class SchemaXSDConvert implements ISchemaXSDConvert {
  constructor(
    private transformXslToJson = new TransformXslToJson(),

    private jsonToCompactSchema = new JsonToCompactSchema(),

    private completeSchemaWithComplexTypeAndSimpleType = new CompleteSchemaWithComplexTypeAndSimpleType()
  ) {}
  async execute(event: string) {
    try {
      /**
       * * transform schema xsd to json
       */
      const bufferJson: any = await this.transformXslToJson.execute(event);
      /**
       * * compact json for each element the schema xsd
       */
      const bufferCompact = await this.jsonToCompactSchema.execute(
        bufferJson,
        event
      );
      /**
       * * for each element the message complete with complex and simple type
       */
      const result: any =
        await this.completeSchemaWithComplexTypeAndSimpleType.execute(
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
