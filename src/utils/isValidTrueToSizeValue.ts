/** Returns true if argument provided is a valid true-to-size value. */
export const isValidTrueToSizeValue = (value: any) => {
  try {
    return [1, 2, 3, 4, 5].includes(parseInt(value));
  } catch (err) {
    return false;
  }
};
