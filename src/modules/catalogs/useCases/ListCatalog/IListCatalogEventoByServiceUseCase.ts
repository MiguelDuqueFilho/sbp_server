import { Mensagem } from "@prisma/client";

export interface IListCatalogEventoByServiceUseCase {
  execute(service: string): Promise<
    {
      Mensagens: Mensagem[];
      CodEvento: string;
      NomeEvento: string;
      IsConvert: boolean;
    }[]
  >;
}
