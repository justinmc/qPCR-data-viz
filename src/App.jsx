import React from 'react';
import WellsGrid from './components/WellsGrid';
import WellsSelection from './components/WellsSelection';
import qpcrData from './qpcr-data.json';
import {
  clearSelection,
  parseMaxCycles,
  parseQpcrData,
  selectRange,
} from './utils/wellUtils';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickWellBound = this.onClickWell.bind(this);

    this.state = {
      maxCycle: null,
      selectionCursor: null, // the well index to shift-select from
      wells: [],
    };
  }

  componentWillMount() {
    const wells = parseQpcrData(qpcrData);
    this.setState({
      maxCycle: parseMaxCycles(qpcrData),
      wells,
    });
  }

  /**
   * Handle clicking on a well to select.
   * There are a lot of UX concerns just for handling how shift/meta behave here,
   * but I think this way is simple good enough for almost all use cases.
   * @param {WellId} wellId
   * @param {Boolean} shiftKey whether shift was down at time of click
   * @param {Boolean} metaKey whether meta was down at time of click
   */
  onClickWell(wellId, shiftKey, metaKey) {
    const { selectionCursor, wells } = this.state;

    const wellIndex = wells
      .findIndex(well => well.id === wellId);
    const well = wells[wellIndex];

    // Meta adds to the existing selection
    let nextWells;
    if (metaKey) {
      nextWells = [...wells];

    // Otherwise clear the existing selection
    } else {
      nextWells = clearSelection(wells);
    }

    // Shift selects a range of wells
    let nextSelectionCursor;
    if (shiftKey && !metaKey) {
      nextSelectionCursor = typeof selectionCursor === 'number'
        ? selectionCursor : wellIndex;
      nextWells = selectRange(nextWells, nextSelectionCursor, wellIndex);

    // Otherwise just toggle the clicked well
    } else {
      const nextWell = {
        ...well,
        selected: !well.selected,
      };
      nextWells[wellIndex] = nextWell;
      nextSelectionCursor = wellIndex;
    }

    this.setState({
      wells: nextWells,
      selectionCursor: nextSelectionCursor,
    });
  }

  render() {
    const { maxCycle, wells } = this.state;

    return (
      <div className="App">
        <div className="panel-left">
          <WellsGrid
            maxCycle={maxCycle}
            onClickWell={this.onClickWellBound}
            wells={wells}
          />
        </div>
        <div className="panel-right">
          <WellsSelection />
        </div>
      </div>
    );
  }
}

export default App;
