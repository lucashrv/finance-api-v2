import { App } from "./app";
import { env } from "./config/env";

const app = new App();

app.start(env.PORT);
