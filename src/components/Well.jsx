import React from 'react';
import PropTypes from 'prop-types';
import { wellPropType } from '../utils/wellUtils';
import { getGradientValue } from '../utils/displayUtils';
import '../styles/Well.css';

// Define 2 stop colors for a simple linear gradient
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

// A single colored well
export default class Well extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickBound = this.onClick.bind(this);
  }

  onClick(event) {
    const { onClick, well } = this.props;
    onClick(well.id, event.shiftKey, event.metaKey);
  }

  render() {
    const { maxCycle, well } = this.props;
    const fraction = well.thresholdCycle / maxCycle;
    const color = getGradientValue(colorStart, colorEnd, fraction);

    let className = 'well';
    if (well.selected) {
      className += ' selected';
    }

    return (
      <div
        className={className}
        onClick={this.onClickBound}
        style={{
          gridRow: well.row + 1, // CSS grid is 1 indexed
          gridColumn: well.column + 1,
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
      />
    );
  }
}

Well.propTypes = {
  maxCycle: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  well: wellPropType.isRequired,
};
