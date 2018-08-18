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
