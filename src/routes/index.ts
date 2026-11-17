import { Router } from "express";
import { UsersRoutes } from "./users.routes";

export class IndexRoutes {
  private router: Router;
  private usersRoutes: UsersRoutes;

  constructor() {
    this.router = Router();
    this.usersRoutes = new UsersRoutes();
    this.init();
  }

  public init() {
    this.router.use("/health", (_req, res) => {
      res.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date(),
      });
    });

    this.router.use("/users", this.usersRoutes.init());

    return this.router;
  }
}
