// main.ts
// 入口

import { badRequest } from "./utils/standardResponse.ts";
import handlers from "./handlers/mod.ts";

Deno.serve((request: Request): Response => {
  console.log(`请求: ${request.url}`);
  for (const handler of handlers) {
    try {
      const response = handler(request);
      return response;
    } catch (_error) {
      continue;
    }
  }

  return badRequest.clone();
});
