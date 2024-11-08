-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'company',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("city", "createdAt", "email", "id", "name", "state", "telefone", "updatedAt") SELECT "city", "createdAt", "email", "id", "name", "state", "telefone", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
CREATE TABLE "new_Volunteer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'volunteer',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Volunteer" ("city", "createdAt", "email", "id", "name", "state", "telefone", "updatedAt") SELECT "city", "createdAt", "email", "id", "name", "state", "telefone", "updatedAt" FROM "Volunteer";
DROP TABLE "Volunteer";
ALTER TABLE "new_Volunteer" RENAME TO "Volunteer";
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
