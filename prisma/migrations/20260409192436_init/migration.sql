-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "department" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "trackingId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_trackingId_key" ON "Complaint"("trackingId");
