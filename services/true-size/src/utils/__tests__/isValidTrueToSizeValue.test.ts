import { isValidTrueToSizeValue } from "../isValidTrueToSizeValue";

describe("isValidTrueToSizeValue", () => {
  it("should return true.", () => {
    expect(
      [1, 2, 3, 4, 5].map(isValidTrueToSizeValue).every(el => el)
    ).toBeTruthy();
  });

  it("should return false.", () => {
    expect(
      [undefined, "", 0, 6, null].map(isValidTrueToSizeValue).every(el => !el)
    ).toBeTruthy();
  });
});
