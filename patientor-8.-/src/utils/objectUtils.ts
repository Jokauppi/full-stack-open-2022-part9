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

const customParam = <T>(
  param: string,
  typeGuard: (value: unknown) => value is T,
  object: object
) => {
  if (!paramInObject(param, object))
    throw new Error(`Parameter ${param} missing in object`);
  if (!typeGuard(object[param]))
    throw new Error(`Parameter ${param} has an invalid value`);
  return object[param] as T;
};

export const validate = (object: unknown) => {
  if (!isValidObject(object)) throw new Error("Not a valid object");
  return {
    string: (param: string) => stringParam(param, object),
    custom: <T>(param: string, typeGuard: (value: unknown) => value is T) =>
      customParam<T>(param, typeGuard, object),
  };
};
