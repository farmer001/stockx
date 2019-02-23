export const isValidTrueToSizeValue = (value: any) => {
  try {
    return [1, 2, 3, 4, 5].includes(parseInt(value));
  } catch (err) {
    console.log("HAHA", err);
    return false;
  }
};
