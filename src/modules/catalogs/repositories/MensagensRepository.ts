import { prisma } from "../../../database/prismaClient";

interface IMensagem {
  CodMsg?: string;
  Tag?: string;
  Descricao: string;
  EntidadeOrigem?: string;
  EntidadeDestino?: string;
  CodEventoId?: string;
}

class MensagensRepository {
  async createMany(mensagens: IMensagem[]) {
    const result = await prisma.mensagem.createMany({
      data: mensagens as [],
      skipDuplicates: true,
    });
    return result;
  }
}

export { MensagensRepository, IMensagem };
