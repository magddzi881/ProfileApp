-- CreateTable
CREATE TABLE "Furniture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL
);
