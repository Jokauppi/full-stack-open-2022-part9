export const isString = (string: unknown): string is string =>
  typeof string === "string" || string instanceof String;
