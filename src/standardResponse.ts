// standardResponse.ts
// 标准的Response模板

// 客户端发送的请求出现问题
export const badRequest: Response = new Response('{"msg":"发送的请求错误"}', {
  status: 400,
  statusText: "400",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});
