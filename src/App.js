import React from 'react';
import History from './history';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.buttons = [
      "MC", "M+", "M-", "MR", "CE",
      "C", "/", "X", "Del",
      "7", "8", "9", "-",
      "4", "5", "6", "+",
      "1", "2", "3", "=",
      "%", "0", "."
    ]
    this.state = {
      answer: "",
      runningTotal: 0,
      operation: "",
      memory: 0,
      memRecall: false,
      historyString: ""
    }
    this.history = React.createRef()
  }

  applyOperation(currentOperation, percentFlag = false) {

    if (this.state.answer === "") {
      this.setState({
        operation: currentOperation
      })
    } else {
      this.setState((state) => {
        let historyAnswer;
        if (percentFlag){
        historyAnswer = state.historyString + " " + (state.answer * 100)
        + "%  of "
        } else {
        historyAnswer = state.historyString + " " + state.answer + " "
        + currentOperation}
        return({
        runningTotal: this.calculateRunningTotal(state.operation,
          state.runningTotal, parseFloat(state.answer)),
        operation: currentOperation,
        answer: "",
        historyString: historyAnswer
      })
    })
  }}

  equals() {
    if (this.state.answer === "") {
      this.setState((state) => ({
        answer: state.runningTotal,
        operation: "="
      }))
    } else {
      this.setState((state) => {
        const calculatedAnswer = this.calculateRunningTotal(state.operation,
          state.runningTotal, parseFloat(state.answer))
        return ({
          answer: calculatedAnswer,
          runningTotal: 0,
          operation: "=",
          historyString: state.historyString + " " + state.answer + " = "
            + calculatedAnswer
        })
      }
        , () => {
          this.history.current.addToHistory(this.state.historyString)
          this.setState({ historyString: "" })
        })
    }
  }

  applyPercentOperation(operation, runningTotal, percentageValue) {
    this.setState((state) => {
      const calculatedAnswer = this.calculateRunningTotal(operation, runningTotal, percentageValue)
      return ({
        answer: calculatedAnswer,
        operation: "=",
        runningTotal: 0,
        historyString: state.historyString + " " + state.answer + "% = " + calculatedAnswer
      })
    }, () => {
      this.history.current.addToHistory(this.state.historyString)
      this.setState({ historyString: "" })
    }
    )
  }

  percentageOf(percentage) {
    this.setState({
      runningTotal: percentage,
      answer: percentage
    })
    this.applyOperation("X", true);
  }

  percent() {
    let percentage = (this.state.answer / 100)
    let percentageChange = percentage * this.state.runningTotal
    if (this.state.operation === "") {
      this.percentageOf(percentage);
    } else if (this.state.operation === "X" || this.state.operation === "/") {
      this.applyPercentOperation(this.state.operation, this.state.runningTotal, percentage);
    } else {
      this.applyPercentOperation(this.state.operation, this.state.runningTotal, percentageChange);
    }
  }



  calculateRunningTotal(operation, currentRunningTotal, newNumber) {
    if (operation === "+") {
      return currentRunningTotal + newNumber;
    } else if (operation === "-") {
      return currentRunningTotal - newNumber;
    } else if (operation === "X") {
      return currentRunningTotal * newNumber;
    } else if (operation === "/") {
      return currentRunningTotal / newNumber;
    } else if (operation === "" || operation === "=") {
      return newNumber;
    }
    throw new Error("invalid operation");
  }

  memoryChange(operator) {
    this.setState((state) => ({
      memory: this.calculateRunningTotal(operator,
        state.memory, parseFloat(state.answer))
    }))
  }

  memoryClear() {
    this.setState({
      memory: 0
    })
  }

  memoryRecall() {
    this.setState((state) => ({
      answer: state.memory,
      memRecall: true
    }))
  }

  clear() {
    this.setState({
      operation: "",
      runningTotal: 0,
      answer: "",
      memRecall: false,
      historyString: ""
    })

  }

  delete() {
    if (this.state.answer !== "") {
      this.setState((state) => ({
        answer: state.answer.substring(0, state.answer.length - 1)
      }))
    }
  }


  handleNumbers(value) {
    this.setState((state) => {
      if (state.operation === "=") {
        return { operation: "", answer: value }
      } else if (state.memRecall) {
        return { answer: value, memRecall: false }
      }
      let answer = state.answer + value;
      if (answer === ".") {
        return { answer: "0." };
      } else {
        return { answer: state.answer + value }
      }
    })
  }

  handleOperators(value) {
    if (value === "+" || value === "-" || value === "/" || value === "X") {
      this.applyOperation(value);
    } else if (value === "%") {
      this.percent();
    } else if (value === "=") {
      this.equals();
    } else if (value === "C") {
      this.clear();
    } else if (value === "Del") {
      this.delete();
    } else if (value === "CE") {
      this.clearEntry();
    } else if (value === "M+") {
      this.memoryChange("+");
    } else if (value === "M-") {
      this.memoryChange("-");
    } else if (value === "MR") {
      this.memoryRecall();
    } else if (value === "MC") {
      this.memoryClear();
    } else {
      console.error("unsupported function", value);
    }
  }

  buttonClicked(value) {
    const regEx = /^(\d|\.)$/
    if (value.match(regEx)) {
      this.handleNumbers(value);
    } else {
      this.handleOperators(value);
    }
  }

  renderButtons() {
    const elements = [];
    const buttons = Array.from(this.buttons);
    let count = 0;
    while (buttons.length > 0) {
      count++;
      const rowButtons = buttons.splice(0, 4);
      const cols = rowButtons.map((b) =>
        <Col sm="3" key={b} className="buttonSet">
          <Button onClick={() => this.buttonClicked(b)}>{b}</Button>
        </Col>
      );
      elements.push(<Row key={count}>{cols}</Row>);
    }

    return (<div className="buttons">{elements}</div>);
  }

  render() {
    console.log(this.state.historyString)
    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Simple Calculator
          </Navbar.Brand>
        </Navbar>
        <Row>
          <Col className="answer">
            <input type="text" value={this.state.answer} readOnly />
            <div className="operator">{this.state.operation}</div>
          </Col>
        </Row>
        {this.renderButtons()}
        <History ref={this.history} />
      </Container>
    );
  }
}

export default App;
