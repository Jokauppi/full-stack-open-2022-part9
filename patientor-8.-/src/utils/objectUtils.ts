import { isString } from "./stringUtils";

const isValidObject = (object: unknown): object is object =>
  !!object && typeof object === "object";

const paramInObject = (
  param: string,
  object: object
): object is object & { [param: string]: unknown } => param in object;

const stringParam = (param: string, object: object) => {
  if (!paramInObject(param, object))
    throw new Error(`Parameter ${param} missing in object`);
  if (!isString(object[param]))
    throw new Error(`Parameter ${param} is not a string`);
  return (object as { [param: string]: string })[param];
};

export const validate = (object: unknown) => {
  if (!isValidObject(object)) throw new Error("Not a valid object");
  return {
    string: (param: string) => stringParam(param, object),
  };
};
