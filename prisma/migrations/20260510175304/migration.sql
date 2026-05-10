/*
  Warnings:

  - You are about to drop the column `card_number` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `payment_account_id` on the `installments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `installments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_day` to the `credit_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `credit_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_day` to the `credit_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_four_digits` to the `credit_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash_code` to the `installments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `installments` table without a default value. This is not possible if the table is not empty.
  - Made the column `number_installments` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('OPEN', 'CLOSED', 'PARTIAL', 'PAID');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credit_cards" DROP COLUMN "card_number",
ADD COLUMN     "closing_day" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "due_day" INTEGER NOT NULL,
ADD COLUMN     "last_four_digits" TEXT NOT NULL,
ADD COLUMN     "limit" INTEGER;

-- AlterTable
ALTER TABLE "installments" DROP COLUMN "payment_account_id",
ADD COLUMN     "hash_code" TEXT NOT NULL,
ADD COLUMN     "invoice_id" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "is_recurring" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "number_installments" SET NOT NULL,
ALTER COLUMN "number_installments" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "credit_card_id" TEXT NOT NULL,
    "reference_month" DATE NOT NULL,
    "closing_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'OPEN',
    "total_amount" INTEGER NOT NULL DEFAULT 0,
    "paid_amount" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_payments" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_slug_key" ON "invoices"("slug");

-- CreateIndex
CREATE INDEX "invoices_user_id_idx" ON "invoices"("user_id");

-- CreateIndex
CREATE INDEX "invoices_credit_card_id_idx" ON "invoices"("credit_card_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_credit_card_id_reference_month_key" ON "invoices"("credit_card_id", "reference_month");

-- CreateIndex
CREATE INDEX "invoice_payments_invoice_id_idx" ON "invoice_payments"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "installments_slug_key" ON "installments"("slug");

-- CreateIndex
CREATE INDEX "installments_invoice_id_idx" ON "installments"("invoice_id");

-- CreateIndex
CREATE INDEX "installments_transaction_id_idx" ON "installments"("transaction_id");

-- CreateIndex
CREATE INDEX "transactions_user_id_idx" ON "transactions"("user_id");

-- CreateIndex
CREATE INDEX "transactions_credit_card_id_idx" ON "transactions"("credit_card_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payments" ADD CONSTRAINT "invoice_payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
