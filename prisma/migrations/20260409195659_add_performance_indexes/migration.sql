-- CreateIndex
CREATE INDEX "Complaint_status_idx" ON "Complaint"("status");

-- CreateIndex
CREATE INDEX "Complaint_category_idx" ON "Complaint"("category");

-- CreateIndex
CREATE INDEX "Complaint_priority_idx" ON "Complaint"("priority");

-- CreateIndex
CREATE INDEX "Complaint_department_idx" ON "Complaint"("department");

-- CreateIndex
CREATE INDEX "Complaint_createdAt_idx" ON "Complaint"("createdAt");
