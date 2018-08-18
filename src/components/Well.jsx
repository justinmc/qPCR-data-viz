import React from 'react';
import { wellPropType } from '../utils/wellUtils';

export default function Well({ well }) {
  return (
    <div
      className="well"
      style={{
        gridRow: well.row + 1, // CSS grid is 1 indexed
        gridColumn: well.column + 1,
      }}
    >
      Well
    </div>
  );
}

Well.propTypes = {
  well: wellPropType.isRequired,
};
