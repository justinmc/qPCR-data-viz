import React from 'react';
import PropTypes from 'prop-types';
import {
  getLetterIndex,
  roundToTwo,
} from '../utils/displayUtils';
import { wellPropType } from '../utils/wellUtils';
import '../styles/WellsSelection.css';

export default function WellsSelection({ wells }) {
  const selectedWells = wells.filter(well => well.selected);

  return (
    <div className="wells-selection">
      <div className="selection-header">
        <div className="selection-cell">
          Well Index
        </div>
        <div className="selection-cell">
          C
          <sub>T</sub>
        </div>
      </div>
      {
        selectedWells.map(well => (
          <div
            className="selection-row"
            key={well.id}
          >
            <div className="selection-cell">
              {`${getLetterIndex(well.row - 1)}${well.column}`}
            </div>
            <div className="selection-cell">
              {roundToTwo(well.thresholdCycle)}
            </div>
          </div>
        ))
      }
    </div>
  );
}

WellsSelection.propTypes = {
  wells: PropTypes.arrayOf(wellPropType).isRequired,
};
