import { prisma } from "../../../database/prismaClient";
import { IMensagem } from "./MensagensRepository";

interface IEvento {
  CodEvento?: string;
  NomeEvento?: string;
  Fluxo?: string;
  GrpServicoId?: string;
  IsConvert?: boolean;
  EventJson?: JSON;
  Mensagens?: IMensagem[];
  createdAt?: string;
  updateAt?: string;
}

class EventosRepository {
  async GetEvent(CodEvento: string) {
    const result = await prisma.evento.findUnique({
      where: {
        CodEvento,
      },
      select: {
        CodEvento: true,
        IsConvert: true,
        EventJson: true,
      },
    });
    return result;
  }
  async createMany(eventos: IEvento[]) {
    const result = await prisma.evento.createMany({
      data: eventos as [],
      skipDuplicates: true,
    });
    return result;
  }

  async list(CodEvento: string) {
    const result = await prisma.evento.findUnique({
      where: {
        CodEvento,
      },
      include: {
        Mensagens: true,
      },
    });
    return result;
  }

  async listByService(service: string) {
    const result = await prisma.evento.findMany({
      where: {
        GrpServicoId: service,
      },
      select: {
        CodEvento: true,
        NomeEvento: true,
        IsConvert: true,
        Mensagens: true,
      },
      orderBy: {
        CodEvento: "asc",
      },
    });
    return result;
  }

  async update(CodEvento: string, dataUpdate: any) {
    const result = await prisma.evento.update({
      where: {
        CodEvento,
      },
      data: dataUpdate,
    });
    return result;
  }
}

export { EventosRepository, IEvento };
