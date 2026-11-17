// import UsersController from "@/controllers/usersController";
import { Router } from "express";

export class UsersRoutes {
  private router: Router;
  //   private usersController: UsersController;

  constructor() {
    this.router = Router();
    // this.usersController = new UsersController();
  }

  public init() {
    this.router.get("/", (_req, res) => {
      res.json({ message: "users" });
    });

    return this.router;
  }
}
