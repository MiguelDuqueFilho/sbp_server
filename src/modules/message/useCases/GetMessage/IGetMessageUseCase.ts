import { Prisma } from "@prisma/client";

export interface IGetMessageUseCase {
  execute(CodEvento: string): Promise<{
    CodEvento: string;
    IsConvert: boolean;
    EventJson: Prisma.JsonValue;
  }>;
}
