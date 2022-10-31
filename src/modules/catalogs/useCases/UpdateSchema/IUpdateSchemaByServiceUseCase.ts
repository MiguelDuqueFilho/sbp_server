import { GrupoServico } from "@prisma/client";

export interface IUpdateSchemaByServiceUseCase {
  execute(service: string): Promise<
    (GrupoServico & {
      _count: {
        Eventos: number;
      };
    })[]
  >;
}
