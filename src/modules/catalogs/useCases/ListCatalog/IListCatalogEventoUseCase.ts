import { Evento, Mensagem } from "@prisma/client";

export interface IListCatalogEventoUseCase {
  execute(event: string): Promise<
    Evento & {
      Mensagens: Mensagem[];
    }
  >;
}
