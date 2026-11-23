-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "complements" TEXT;

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "process_number" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "court_number" TEXT NOT NULL,
    "car_brand" TEXT NOT NULL,
    "car_model" TEXT NOT NULL,
    "car_color" TEXT NOT NULL,
    "car_plates" TEXT NOT NULL,
    "car_year" INTEGER NOT NULL,
    "receipt_chance" TEXT NOT NULL,
    "current_status" TEXT NOT NULL,
    "has_active_action" BOOLEAN NOT NULL,
    "case_summary" TEXT NOT NULL,
    "notes" TEXT,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Process_process_number_key" ON "Process"("process_number");

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
