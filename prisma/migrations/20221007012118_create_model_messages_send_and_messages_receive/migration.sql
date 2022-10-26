-- CreateTable
CREATE TABLE "MessagesReceive" (
    "id" TEXT NOT NULL,
    "CodMsg" TEXT NOT NULL,
    "xmlMessage" TEXT NOT NULL,
    "status_msg" INTEGER NOT NULL,
    "message_error" TEXT,
    "message_proc" BOOLEAN NOT NULL,
    "dateRef" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessagesReceive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesSend" (
    "id" TEXT NOT NULL,
    "CodMsg" TEXT NOT NULL,
    "xmlMessage" TEXT NOT NULL,
    "status_msg" INTEGER NOT NULL,
    "message_error" TEXT,
    "message_proc" BOOLEAN NOT NULL,
    "dateRef" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessagesSend_pkey" PRIMARY KEY ("id")
);
