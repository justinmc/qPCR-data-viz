import React from 'react';
import WellsGrid from './components/WellsGrid';
import WellsSelection from './components/WellsSelection';
import qpcrData from './qpcr-data.json';
import {
  parseMaxCycles,
  parseQpcrData,
} from './utils/wellUtils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    const { maxCycle, wells } = this.state;

    return (
      <div className="App">
        <div className="panel-left">
          <WellsGrid
            maxCycle={maxCycle}
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
