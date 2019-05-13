
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

  const rgbInteger = Math.ceil(rgb);
  const hex = rgbInteger.toString(16);

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

enum KnownColorNames {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
  Black = 'Black',
  Gray = 'Gray',
  White = 'White',
}

type Colors = { [k in KnownColorNames]: Color };

export const KnownColors: Colors = {
  Red: { r: 255, g: 0, b: 0 },
  Green: { r: 0, g: 255, b: 0 },
  Blue: { r: 0, g: 0, b: 255 },
  Black: { r: 0, g: 0, b: 0 },
  Gray: { r: 128, g: 128, b: 128 },
  White: { r: 255, g: 255, b: 255 },
};
