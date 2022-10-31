import { GrupoServico } from "@prisma/client";

export interface IListCatalogServicoConvertUseCase {
  execute(): Promise<
    (GrupoServico & {
      _count: {
        Eventos: number;
      };
    })[]
  >;
}
