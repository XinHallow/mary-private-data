import { join } from "@std/path";
import { badRequest } from "../utils/standardResponse.ts";
import { validatePath } from "../utils/urlPattern.ts";
import getContentType from "../utils/getContent-Type.ts";

export default function (request: Request): Response {
  // 匹配url
  const result: {
    protocol: string;
    domain: string;
    paths: string[];
  } | null = validatePath(new URL(request.url), {
    allowEmpty: false,
    allowContinuousSlash: false,
    allowTrailingSlash: false,
    prefix: "data",
    excludeString: [],
  });
  if (result === null) {
    throw new Error();
  }

  const requireFilePath = join(".", "data", ...result.paths);
  const contentType = getContentType(result.paths[result.paths.length-1]);
  console.log("请求文件:", requireFilePath  );
  try {
    const content = Deno.readFileSync(requireFilePath);
    if (!contentType) {
      return badRequest.clone();
    }
    return new Response(content, {
      headers: new Headers({
        "Content-Type": contentType,
      }),
      status: 200,
      statusText: "200",
    });
  } catch (_) {
    return badRequest.clone();
  }
}
