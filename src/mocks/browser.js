import { setupWorker } from "msw/browser";
import { handlers } from "./apis/handlers";

export const worker = setupWorker(...handlers);
