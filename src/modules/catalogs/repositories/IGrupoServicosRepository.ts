import { GrupoServico, Prisma } from "@prisma/client";

export interface IGrupoServicosRepository {
  createMany(grpServicos: GrupoServico[]): Promise<Prisma.BatchPayload>;
  listAll(): Promise<
    (GrupoServico & {
      _count: {
        Eventos: number;
      };
    })[]
  >;
  
  listAllConverted(): Promise<
    (GrupoServico & {
      _count: {
        Eventos: number;
      };
    })[]
  >;
  listService(service: string): Promise<
    GrupoServico & {
      Eventos: {
        CodEvento: string;
        NomeEvento: string;
        Fluxo: string;
        IsConvert: boolean;
        EventJson: Prisma.JsonValue;
      }[];
    }
  >;
}
