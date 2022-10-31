import { GrupoServico } from "@prisma/client";

import { prisma } from "../../../database/prismaClient";
import { IGrupoServicosRepository } from "./IGrupoServicosRepository";

export class GrupoServicosRepository implements IGrupoServicosRepository {
  async createMany(grpServicos: GrupoServico[]) {
    const result = await prisma.grupoServico.createMany({
      data: grpServicos as [],
      skipDuplicates: true,
    });
    return result;
  }
  async listAll() {
    const result = await prisma.grupoServico.findMany({
      include: {
        _count: {
          select: {
            Eventos: {
              where: {
                IsConvert: false,
              },
            },
          },
        },
      },
      orderBy: {
        GrpServico: "asc",
      },
    });
    return result;
  }
  async listAllConverted() {
    const result = await prisma.grupoServico.findMany({
      include: {
        _count: {
          select: {
            Eventos: {
              where: {
                IsConvert: true,
              },
            },
          },
        },
      },
      orderBy: {
        GrpServico: "asc",
      },
    });
    return result;
  }

  async listService(service: string) {
    const result = await prisma.grupoServico.findUnique({
      where: {
        GrpServico: service,
      },
      include: {
        Eventos: {
          select: {
            CodEvento: true,
            NomeEvento: true,
            Fluxo: true,
            IsConvert: true,
            EventJson: true,
          },
        },
      },
    });
    return result;
  }
}
