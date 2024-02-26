export const areNumbers = (numbers: unknown[]) =>
  numbers.every((number) => !isNaN(Number(number)));
