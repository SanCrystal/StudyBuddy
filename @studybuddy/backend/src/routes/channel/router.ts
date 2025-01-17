import { Hono } from "hono";
import { createPaginatedResource } from "@studybuddy/backend/utils/pagination";

export default new Hono()
  .get("/", (c) => {
    return c.json(createPaginatedResource({}, { page: 1, perPage: 10, total: 100 }))
  })
