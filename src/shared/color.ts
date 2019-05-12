
export interface Color {
  r: number;
  g: number;
  b: number;
}

const parseStringIntoHex = (hexString: string): number => {
  return parseInt(hexString, 16);
};

/**
 * This function takes in a single RGB value between 0 and 255, and converts
 * it to a hexadecimal string.
 *
 * @param rgb a integer RGB value, between 0-255
 */
const convertRgbValueToHexString = (rgb: number): string => {
  if (rgb > 255 || rgb < 0) {
    throw new Error(`RGB values can only range between 0 and 255, but got a value that was ${rgb}`);
  }
  const hex = rgb.toString(16);

  // Append a zero if the generated hex string has only one character.
  return hex.length < 2
    ? `0${hex}`
    : hex;
};

/**
 * This function takes in a single RGB value between 0 and 255, and converts
 * it to a hexadecimal number value.
 *
 * @param rgb a integer RGB value, between 0-255
 */
export const convertRgbValueToHex = (rgb: number): number => {
  const hexString = convertRgbValueToHexString(rgb);

  return parseStringIntoHex(hexString);
};

/**
 * This function takes in a color with RGB values and transforms it into a hexadecimal string.
 *
 * @param color a RGB color to be converted into a hexadecimal number
 */
export const convertFullColorToHex = (color: Color): number => {
  const red = convertRgbValueToHexString(color.r);
  const green = convertRgbValueToHexString(color.g);
  const blue = convertRgbValueToHexString(color.b);

  const hexString = red + green + blue;

  return parseStringIntoHex(hexString);
};
