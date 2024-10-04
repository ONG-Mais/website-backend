import express from "express";

import { PrismaClient } from "@prisma/client";

import cors from "cors";

export const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

export const prisma = new PrismaClient();
app.use(express.json());

export default app;
