import PropTypes from 'prop-types';

export const wellPropType = PropTypes.exact({
  id: PropTypes.string,
  row: PropTypes.number,
  column: PropTypes.number,
});

/**
 * Given a wellId (key from qpcrData), return the row and column.
 * wellId of format 'row:16||column:24', any number of digits supported.
 * @param {WellId} wellId
 * @returns {Position}
 */
export function parsePosition(wellId) {
  const endOfRow = wellId.indexOf('|');
  const row = parseInt(wellId.substring(4, endOfRow), 10);
  const column = parseInt(wellId.substring(endOfRow + 9, wellId.length), 10);
  return { row, column };
}

/**
 * Takes raw qpcr data and returns data parsed into 2d structure
 * @param {Object<Object[]>} qpcrDataRaw
 * @returns {Well[]}
 */
export function parseQpcrData(qpcrDataRaw) {
  return Object.entries(qpcrDataRaw).reduce((wells, [key, wellData]) => {
    const position = parsePosition(key);
    // TODO use wellData to calculate threshold cycle
    return wells.concat([{
      id: key,
      row: position.row,
      column: position.column,
    }]);
  }, []);
}

/**
 * Get the dimensions of the wells data in total rows and columns
 * @param {Well[]}
 * @returns {Object<Number, Number>}
 */
export function getDimensions(wells) {
  if (!wells.length) {
    return {
      rows: 0,
      columns: 0,
    };
  }

  const lastWell = wells[wells.length - 1];
  const lastPosition = parsePosition(lastWell.id);
  return {
    rows: lastPosition.row,
    columns: lastPosition.column,
  };
}
