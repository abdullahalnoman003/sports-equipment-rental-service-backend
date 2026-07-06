import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const sourceDir = path.resolve("generated/prisma");
const targetDir = path.resolve("dist/generated/prisma");

if (!existsSync(sourceDir)) {
  throw new Error(`Missing Prisma client directory: ${sourceDir}`);
}

mkdirSync(path.dirname(targetDir), { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Copied Prisma client from ${sourceDir} to ${targetDir}`);