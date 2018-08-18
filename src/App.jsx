import React from 'react';
import WellsGrid from './components/WellsGrid';
import WellsSelection from './components/WellsSelection';
import qpcrData from './qpcr-data.json';
import {
  parseMaxCycles,
  parseQpcrData,
} from './utils/wellUtils';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickWellBound = this.onClickWell.bind(this);

    this.state = {
      maxCycle: null,
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

  onClickWell(wellId) {
    const { wells } = this.state;

    const wellIndex = wells
      .findIndex(well => well.id === wellId);
    const well = wells[wellIndex];

    // TODO more complicated unselection of all if click, toggle, ctrl/shift select
    const nextWell = {
      ...well,
      selected: true,
    };
    const nextWells = [...wells];
    nextWells[wellIndex] = nextWell;

    this.setState({
      wells: nextWells,
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
