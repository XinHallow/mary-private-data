// main.ts
// 入口

import { badRequest } from "./standardResponse.ts";

Deno.serve((): Response => {
  return badRequest;
});
