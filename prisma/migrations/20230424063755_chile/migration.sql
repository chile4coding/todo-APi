-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_todoId_key" ON "Todo"("todoId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
