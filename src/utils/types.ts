// 获取文件列表返回值
export type Entry = {
  type: "file" | "folder";
  name: string;
  insides?: Entry;
};

// 键值对
export type keyValueStore = {
  [key: string]: string;
};
