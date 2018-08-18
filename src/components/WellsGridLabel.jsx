import React from 'react';
import PropTypes from 'prop-types';

// The row/column labels in WellsGrid
export default class WellsGridLabel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickBound = this.onClick.bind(this);
  }

  onClick(event) {
    const { index, isRow, onClick } = this.props;

    onClick(index, isRow, event.metaKey);
  }

  render() {
    const {
      className,
      gridRow,
      gridColumn,
      label,
    } = this.props;

    return (
      <div
        className={`wells-grid-label ${className}`}
        style={{
          gridRow,
          gridColumn,
        }}
      >
        <button
          className="row-column-button"
          onClick={this.onClickBound}
          type="button"
        >
          {label}
        </button>
      </div>
    );
  }
}

WellsGridLabel.propTypes = {
  className: PropTypes.string,
  gridColumn: PropTypes.number.isRequired,
  gridRow: PropTypes.number.isRequired,
  index: PropTypes.number,
  isRow: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

WellsGridLabel.defaultProps = {
  className: '',
  index: null,
  isRow: false,
  label: '',
  onClick: () => {},
};
