/*
  Warnings:

  - Made the column `userId` on table `favorites` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "photo_reference" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "vinicity" TEXT,
    "formated_address" TEXT,
    "open_now" BOOLEAN,
    "userId" TEXT NOT NULL,
    CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favorites" ("formated_address", "id", "lat", "lng", "name", "open_now", "photo_reference", "rating", "userId", "vinicity") SELECT "formated_address", "id", "lat", "lng", "name", "open_now", "photo_reference", "rating", "userId", "vinicity" FROM "favorites";
DROP TABLE "favorites";
ALTER TABLE "new_favorites" RENAME TO "favorites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");
