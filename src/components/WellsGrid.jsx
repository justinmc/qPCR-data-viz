import React from 'react';
import PropTypes from 'prop-types';
import Well from './Well';
import {
  getDimensions,
  wellPropType,
} from '../utils/wellUtils';
import { getLetterIndex } from '../utils/displayUtils';
import WellsGridLabel from './WellsGridLabel';
import '../styles/WellsGrid.css';

// The big grid of wells
export default function WellsGrid({
  maxCycle,
  onChangeSelectAll,
  onClickRowOrColumn,
  onClickWell,
  wells,
}) {
  const allAreSelected = wells.every(well => well.selected);
  const dimensions = getDimensions(wells);

  // The top numbered header grid items
  const headers = [];
  for (let column = 0; column < dimensions.columns; column += 1) {
    const displayColumn = column + 1; // 1 indexed
    const gridColumn = column + 2; // 1 indexed and offset by 1
    headers.push(
      <WellsGridLabel
        className="header"
        gridColumn={gridColumn}
        gridRow={1}
        index={column}
        key={column}
        label={displayColumn.toString()}
        onClick={onClickRowOrColumn}
      />,
    );
  }

  // The letter sidebar
  const sides = [];
  for (let row = 0; row < dimensions.rows; row += 1) {
    const gridRow = row + 2; // 1 indexed and offset by 1
    sides.push(
      <WellsGridLabel
        className="side"
        gridColumn={1}
        gridRow={gridRow}
        index={row}
        isRow
        key={row}
        label={getLetterIndex(row)}
        onClick={onClickRowOrColumn}
      />,
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
        <input
          type="checkbox"
          checked={allAreSelected}
          onChange={onChangeSelectAll}
        />
      </div>
      {headers}
      {sides}
      {
        wells.map(well => (
          <Well
            key={well.id}
            maxCycle={maxCycle}
            onClick={onClickWell}
            well={well}
          />
        ))
      }
    </div>
  );
}

WellsGrid.propTypes = {
  maxCycle: PropTypes.number.isRequired,
  onChangeSelectAll: PropTypes.func.isRequired,
  onClickRowOrColumn: PropTypes.func.isRequired,
  onClickWell: PropTypes.func.isRequired,
  wells: PropTypes.arrayOf(wellPropType).isRequired,
};
