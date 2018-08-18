/**
 * Given a numerical index, return a letter index following the pattern:
 * A, B, C, ... Z, AA, AB, AC, ...
 * @param {Number} index
 */
export function getLetterIndex(index) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (index < alphabet.length) {
    return alphabet[index];
  }

  const leastSignificant = index % alphabet.length;
  const nextIndex = Math.floor(index / alphabet.length) - 1;

  return getLetterIndex(nextIndex) + alphabet[leastSignificant];
}

/**
 * Linearly interpolate from point1 to point2 by fraction of the total distance.
 * @param {Vector3} point1
 * @param {Vector3} point2
 * @param {Number} value between 0 and 1
 * @returns {Vector3}
 */
export function interpolate(point1, point2, fraction) {
  const xD = point2.x - point1.x;
  const yD = point2.y - point1.y;
  const zD = point2.z - point1.z;

  return {
    x: point1.x + xD * fraction,
    y: point1.y + yD * fraction,
    z: point1.z + zD * fraction,
  };
}

/**
 * Get a gradient value between the color start and end by fraction amount.
 * @param {Color} colorStart
 * @param {Color} colorEnd
 * @param {Number} fraction between 0 and 1
 * @returns {Color}
 */
// TODO Looks like the screenshot uses at least 3 colors in the gradient?
export function getGradientValue(colorStart, colorEnd, fraction) {
  const { x, y, z } = interpolate(
    { x: colorStart.r, y: colorStart.g, z: colorStart.b },
    { x: colorEnd.r, y: colorEnd.g, z: colorEnd.b },
    fraction,
  );
  return { r: x, g: y, b: z };
}

/**
 * Round the number to 2 places after the decimal point.
 * @param {Number} number
 * @returns {Number}
 */
export function roundToTwo(number) {
  return Math.round(number * 100) / 100;
}
