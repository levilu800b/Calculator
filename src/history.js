import React from 'react';
import './history.css';

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      historyLines: []
    }
  }

  addToHistory(entry) {
    this.setState( (state) => ({
      historyLines:  state.historyLines.concat([entry])
    }))
  }

  generateRows() {
    return this.state.historyLines.map((b,i) =>
      <tr key={i}>
        <td>{b}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h2> History</h2>
        <table>
          <tbody>
          {this.generateRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default History;
