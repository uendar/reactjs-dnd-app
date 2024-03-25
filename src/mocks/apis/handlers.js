import { http, HttpResponse } from "msw";
const data = require("../data/mockup.json");

export const handlers = [
  http.get("/api/catsList", () => {
    return HttpResponse.json(data);
  }),
];
