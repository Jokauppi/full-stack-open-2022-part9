import { isString } from "./stringUtils";

const isValidObject = (object: unknown): object is object =>
  !!object && typeof object === "object";

const paramInObject = (
  param: string,
  object: object
): object is object & { [param: string]: unknown } => param in object;

const stringProp = (object: object) => (prop: string) => {
  if (!paramInObject(prop, object))
    throw new Error(`Property ${prop} missing in object`);
  if (!isString(object[prop]))
    throw new Error(`Property ${prop} is not a string`);
  return (object as { [prop: string]: string })[prop];
};

const customProp =
  (object: object) =>
  <T>(prop: string, typeGuard: (value: unknown) => value is T) => {
    if (!paramInObject(prop, object))
      throw new Error(`Property ${prop} missing in object`);
    if (!typeGuard(object[prop]))
      throw new Error(`Property ${prop} has an invalid value`);
    return object[prop] as T;
  };

export const validate = (object: unknown) => {
  if (!isValidObject(object)) throw new Error("Not a valid object");
  return {
    string: stringProp(object),
    custom: customProp(object),
  };
};
