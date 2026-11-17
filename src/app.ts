import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cors from "cors";
import { routeNotFound } from "./middlewares/routeNotFound";
import { IndexRoutes } from "./routes";
import { prisma } from "./prisma/prisma";

export class App {
  private app: Application;
  private routes: IndexRoutes;

  constructor() {
    this.app = express();
    this.routes = new IndexRoutes();
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));

    // Enable CORS
    this.app.use(
      cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      }),
    );

    // Initialize routes
    this.app.use("/api", this.routes.init());

    // Route not found 404
    this.app.use(routeNotFound);

    // Global error handling
    this.app.use(globalErrorHandler);
  }

  public async start(port: number) {
    try {
      await prisma.$connect();

      console.log("DB connected successfully!");

      this.app.listen(port, () => {
        console.log(`Server is running`);
      });
    } catch (error) {
      console.error("Database connection failed:", error);

      await prisma.$disconnect();
      process.exit(1);
    }
  }
}
