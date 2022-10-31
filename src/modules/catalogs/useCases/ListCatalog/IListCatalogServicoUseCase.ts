import { GrupoServico } from "@prisma/client";

export interface IListCatalogServicoUseCase {
  execute(): Promise<
    (GrupoServico & {
      _count: {
        Eventos: number;
      };
    })[]
  >;
}
