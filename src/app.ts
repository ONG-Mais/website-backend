import express from "express";

import { PrismaClient } from "@prisma/client";

import cors from "cors";
import volunteerRouter from "./routes/volunteer.router";

export const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

export const prisma = new PrismaClient();
app.use(express.json());

app.use("/api/volunteers", volunteerRouter);

export default app;
