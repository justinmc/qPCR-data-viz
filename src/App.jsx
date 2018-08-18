import React from 'react';
import WellsGrid from './components/WellsGrid';
import WellsSelection from './components/WellsSelection';
import qpcrData from './qpcr-data.json';
import { parseQpcrData } from './utils/wellUtils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wells: [],
    };
  }

  componentDidMount() {
    const wells = parseQpcrData(qpcrData);
    this.setState({
      wells,
    });
  }

  render() {
    const { wells } = this.state;

    return (
      <div className="App">
        <div className="panel-left">
          <WellsGrid
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
