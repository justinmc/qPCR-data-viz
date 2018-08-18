import PropTypes from 'prop-types';
import { interpolate } from './displayUtils';

export const wellPropType = PropTypes.exact({
  id: PropTypes.string,
  row: PropTypes.number,
  column: PropTypes.number,
  selected: PropTypes.bool,
  thresholdCycle: PropTypes.number,
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
 * Rather than assuming we'll always have 40 cycles, look at the number of
 * cycles in the first entry in the qpcrData and use that.
 * @param {Object<Object[]>} qpcrData
 * @returns {Number}
 */
export function parseMaxCycles(qpcrData) {
  const cycles = Object.values(qpcrData)[0];
  return cycles[cycles.length - 1].cycle;
}

/**
 * Given cycles, find the cycle where fluorescence passes the threshold value
 * Assumes ordered cycles!
 * @param {Cycle[]}
 * @returns {Number}
 */
const thresholdValue = 104;
export function getThresholdCycle(cycles) {
  const upperBound = cycles
    .findIndex(cycle => cycle.fluorescence >= thresholdValue);

  // If never crosses thresholdValue, just use last cycle?
  if (upperBound === -1) {
    return cycles[cycles.length - 1].cycle;
  }
  // If starts out past thresholdValue, shouldn't happen, but return first cycle
  if (upperBound === 0) {
    return cycles[0].cycle;
  }

  const lowerBoundCycle = cycles[upperBound - 1];
  const upperBoundCycle = cycles[upperBound];

  // If a cycle perfectly lands on the thresholdValue
  if (upperBoundCycle.fluorescence === thresholdValue) {
    return upperBoundCycle.cycle;
  }

  // Simple linear interpolation between two closest points
  // TODO cubic interpolation between all points for better result?
  const fluorescenceD = upperBoundCycle.fluorescence - lowerBoundCycle.fluorescence;
  const thresholdFluorescenceD = thresholdValue - lowerBoundCycle.fluorescence;
  const fraction = thresholdFluorescenceD / fluorescenceD;
  const { x: thresholdCycle } = interpolate(
    { x: lowerBoundCycle.cycle, y: lowerBoundCycle.fluorescence, z: 0 },
    { x: upperBoundCycle.cycle, y: upperBoundCycle.fluorescence, z: 0 },
    fraction,
  );
  return thresholdCycle;
}

/**
 * Takes raw qpcr data and returns data parsed into 2d structure
 * @param {Object<Object[]>} qpcrDataRaw
 * @returns {Well[]}
 */
export function parseQpcrData(qpcrDataRaw) {
  return Object.entries(qpcrDataRaw).reduce((wells, [key, cycles]) => {
    const position = parsePosition(key);
    const thresholdCycle = getThresholdCycle(cycles);
    return wells.concat([{
      id: key,
      row: position.row,
      column: position.column,
      selected: false,
      thresholdCycle,
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
