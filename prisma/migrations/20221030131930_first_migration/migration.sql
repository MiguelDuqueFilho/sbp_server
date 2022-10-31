-- CreateEnum
CREATE TYPE "MsgProcessEnum" AS ENUM ('ACTIVE', 'PENDING', 'DISABLE');

-- CreateEnum
CREATE TYPE "MSgStatusEnum" AS ENUM ('VALIDATE', 'ERROR');

-- CreateTable
CREATE TABLE "ServerLogs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "ServerLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoServicos" (
    "GrpServico" VARCHAR(15) NOT NULL,
    "Descricao" VARCHAR(255) NOT NULL,
    "Dominio" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrupoServicos_pkey" PRIMARY KEY ("GrpServico")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "CodEvento" VARCHAR(15) NOT NULL,
    "NomeEvento" VARCHAR(255),
    "Fluxo" VARCHAR(10) NOT NULL,
    "GrpServicoId" VARCHAR(15),
    "IsConvert" BOOLEAN NOT NULL DEFAULT false,
    "EventJson" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("CodEvento")
);

-- CreateTable
CREATE TABLE "Mensagens" (
    "CodMsg" VARCHAR(15) NOT NULL,
    "Tag" VARCHAR(255) NOT NULL,
    "Descricao" VARCHAR(255) NOT NULL,
    "EntidadeOrigem" VARCHAR(50) NOT NULL,
    "EntidadeDestino" VARCHAR(50) NOT NULL,
    "CodEventoId" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mensagens_pkey" PRIMARY KEY ("CodMsg")
);

-- CreateTable
CREATE TABLE "MessagesReceive" (
    "id" TEXT NOT NULL,
    "codMsg" TEXT NOT NULL,
    "xmlMessage" XML NOT NULL,
    "process" "MsgProcessEnum" NOT NULL DEFAULT 'DISABLE',
    "status" "MSgStatusEnum" NOT NULL DEFAULT 'ERROR',
    "error" JSONB,
    "dateRef" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessagesReceive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesSend" (
    "id" TEXT NOT NULL,
    "codMsg" TEXT NOT NULL,
    "xmlMessage" XML NOT NULL,
    "process" "MsgProcessEnum" NOT NULL DEFAULT 'DISABLE',
    "status" "MSgStatusEnum" NOT NULL DEFAULT 'ERROR',
    "error" JSONB,
    "dateRef" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessagesSend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Eventos" ADD CONSTRAINT "Eventos_GrpServicoId_fkey" FOREIGN KEY ("GrpServicoId") REFERENCES "GrupoServicos"("GrpServico") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagens" ADD CONSTRAINT "Mensagens_CodEventoId_fkey" FOREIGN KEY ("CodEventoId") REFERENCES "Eventos"("CodEvento") ON DELETE RESTRICT ON UPDATE CASCADE;
