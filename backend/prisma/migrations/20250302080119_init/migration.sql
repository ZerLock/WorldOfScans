-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "saved" TEXT[],

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Read" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "Read_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
