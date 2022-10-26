/**
 * isObjectString
 * @param value
 * @returns boolean
 */
export const isObjectString = (value: any): boolean => {
  return !!(
    value && Object.prototype.toString.call(value) === "[object String]"
  );
};

/**
 * isObjectObject
 * @param value
 * @returns boolean
 */
export const isObjectObject = (value: any): boolean => {
  return !!(
    value && Object.prototype.toString.call(value) === "[object Object]"
  );
};

/**
 * isObjectArray
 * @param value
 * @returns boolean
 */
export const isObjectArray = (value: any): boolean => {
  return !!(
    value && Object.prototype.toString.call(value) === "[object Array]"
  );
};

/**
 * verify is string | number  is numeric
 * @param value
 * @returns boolean = true is numeric else false
 */
export const IsNumeric = (value: any): boolean => {
  return (
    (typeof value === "number" ||
      (typeof value === "string" && value.trim() !== "")) &&
    !Number.isNaN(value as number)
  );
};
