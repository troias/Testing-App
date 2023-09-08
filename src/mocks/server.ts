import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import exp from "constants";

export const server = setupServer(...handlers);
