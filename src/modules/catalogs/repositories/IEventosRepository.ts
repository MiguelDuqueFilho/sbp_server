import { Prisma, Evento, Mensagem } from "@prisma/client";

export interface IEventosRepository {
  getEvent(CodEvento: string): Promise<{
    CodEvento: string;
    IsConvert: boolean;
    EventJson: Prisma.JsonValue;
  }>;
  createMany(eventos: Evento[]): Promise<Prisma.BatchPayload>;
  list(CodEvento: string): Promise<
    Evento & {
      Mensagens: Mensagem[];
    }
  >;
  listByService(service: string): Promise<
    {
      Mensagens: Mensagem[];
      CodEvento: string;
      NomeEvento: string;
      IsConvert: boolean;
    }[]
  >;
  update(CodEvento: string, dataUpdate: any): Promise<Evento>;
}
