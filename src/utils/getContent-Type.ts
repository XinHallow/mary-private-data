import { keyValueStore } from "./types.ts";

const contentTypes: keyValueStore = {
  html: "text/html",
  css: "text/css",
};

export default function (filename: string) {
  const extStr: string = filename.slice(filename.lastIndexOf(".") + 1);
  const ext: string = contentTypes[extStr];
  if (!ext) {
    return null;
  }
  return ext;
}
