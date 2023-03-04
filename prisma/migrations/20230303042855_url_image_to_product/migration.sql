/*
  Warnings:

  - Added the required column `urlImage` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "urlImage" TEXT NOT NULL;
