import React from 'react';
import PropTypes from 'prop-types';
import { wellPropType } from '../utils/wellUtils';
import { getGradientValue } from '../utils/displayUtils';
import '../styles/Well.css';

const colorStart = {
  r: 255,
  g: 255,
  b: 255,
};
const colorEnd = {
  r: 36,
  g: 67,
  b: 155,
};

export default function Well({ maxCycle, well }) {
  const fraction = well.thresholdCycle / maxCycle;
  const color = getGradientValue(colorStart, colorEnd, fraction);

  return (
    <div
      className="well"
      style={{
        gridRow: well.row + 1, // CSS grid is 1 indexed
        gridColumn: well.column + 1,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    />
  );
}

Well.propTypes = {
  maxCycle: PropTypes.number.isRequired,
  well: wellPropType.isRequired,
};
