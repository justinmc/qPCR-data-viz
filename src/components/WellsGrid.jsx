import React from 'react';
import PropTypes from 'prop-types';
import Well from './Well';
import {
  getDimensions,
  wellPropType,
} from '../utils/wellUtils';
import { getLetterIndex } from '../utils/displayUtils';
import '../styles/WellsGrid.css';

export default function WellsGrid({ wells }) {
  const dimensions = getDimensions(wells);

  // The top numbered header grid items
  const headers = [];
  for (let column = 0; column < dimensions.columns; column += 1) {
    const displayColumn = column + 1; // 1 indexed
    const gridColumn = column + 2; // 1 indexed and offset by 1
    headers.push(
      <div
        className="header"
        key={gridColumn}
        style={{
          gridRow: 1,
          gridColumn,
        }}
      >
        {displayColumn}
      </div>,
    );
  }

  // The letter sidebar
  const sides = [];
  for (let row = 0; row < dimensions.rows; row += 1) {
    const gridRow = row + 2; // 1 indexed and offset by 1
    sides.push(
      <div
        className="side"
        key={row}
        style={{
          gridRow,
          gridColumn: 1,
        }}
      >
        {getLetterIndex(row)}
      </div>,
    );
  }

  return (
    <div
      className="wells-grid"
    >
      <div
        className="header"
        key={0}
        style={{
          gridRow: 1,
          gridColumn: 1,
        }}
      >
        Checkbox
      </div>
      {headers}
      {sides}
      {
        wells.map(well => (
          <Well
            key={well.id}
            well={well}
          />
        ))
      }
    </div>
  );
}

WellsGrid.propTypes = {
  wells: PropTypes.arrayOf(wellPropType).isRequired,
};
