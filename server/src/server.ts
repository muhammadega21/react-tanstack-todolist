import app from "./app";
import "dotenv/config";
import { connectDB, disconnectDB } from "./lib/db";

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = async (code = 0) => {
  try {
    console.log("Shutting down server");

    const forceExit = setTimeout(() => {
      console.error("Force shutdown");
      process.exit(1);
    }, 5000);

    forceExit.unref();

    if (server) {
      server.close(() => console.log("Server closed"));
    }

    await disconnectDB();
    process.exit(code);
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  shutdown(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  shutdown(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received");
  shutdown(0);
});
