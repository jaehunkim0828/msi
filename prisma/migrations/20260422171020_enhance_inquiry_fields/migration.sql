/*
  Warnings:

  - Added the required column `phone` to the `contact_inquiries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_inquiries" ADD COLUMN     "attachments" TEXT,
ADD COLUMN     "budget_range" TEXT,
ADD COLUMN     "current_equipment" TEXT,
ADD COLUMN     "equipment_model" TEXT,
ADD COLUMN     "expected_timeline" TEXT,
ADD COLUMN     "inquiry_type" TEXT,
ADD COLUMN     "install_location" TEXT,
ADD COLUMN     "issue_date" TEXT,
ADD COLUMN     "issue_type" TEXT,
ADD COLUMN     "line_status" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "priority" TEXT,
ADD COLUMN     "production_volume" TEXT,
ADD COLUMN     "serial_number" TEXT,
ALTER COLUMN "product" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "contact_inquiries_priority_idx" ON "contact_inquiries"("priority");
