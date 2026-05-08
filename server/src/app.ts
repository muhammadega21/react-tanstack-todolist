import express from "express";
import helmet from "helmet";
import router from "./modules/routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} tidak ditemukan`,
  });
});

app.use(errorHandler);

export default app;
