/**
 * 匹配路径配置
 */
export interface PathValidationConfig {
  // 1. 路径必须以此开头, 如 `resource`
  prefix: string;
  // 2. 排除的字符串, 如 `["a", "b"]`
  excludeString: string[];
  // 3. 是否允许以 `/` 结尾
  allowTrailingSlash: boolean;
  // 4. 是否允许空路径
  allowEmpty: boolean;
  // 5. 是否允许连续的 `/`
  allowContinuousSlash: boolean;
}

/**
 * 匹配路径
 * @param url 完整的URL, 如 `https://www.123.com/resource/page/resource`
 * @param config 配置
 * @returns 获取到的路径或是失败所返回的 `null`
 */
export function validatePath(
  url: URL,
  config: PathValidationConfig
): {
  protocol: string;
  domain: string;
  paths: string[];
} | null {
  // 检查传入的config
  if (!config.allowEmpty && config.prefix === "") {
    throw new Error(
      "Warn! function validatePath's param config's value prefix cannot be empty string"
    );
  }

  // 检查路径是否以指定的前缀开头
  if (!url.pathname.startsWith("/" + config.prefix) && !config.allowEmpty) {
    return null;
  }

  // 检查路径中是否包含排除的字符串
  for (const exclude of config.excludeString) {
    if (url.pathname.includes(exclude)) {
      return null;
    }
  }

  // 检查路径是否以 `/` 结尾
  if (!config.allowTrailingSlash && url.pathname.endsWith("/")) {
    return null;
  }

  // 检查路径中是否包含连续的 `/`
  if (!config.allowContinuousSlash && /\/{2,}/.test(url.pathname)) {
    return null;
  }

  // 检查路径是否为空
  if (!config.allowEmpty && url.pathname === "") {
    return null;
  }

  // 返回路径数组
  const result = url.pathname.split("/").filter(Boolean);
  return {
    protocol: url.protocol.replace(":", ""),
    domain: url.hostname,
    paths: result.splice(1),
  };
}
