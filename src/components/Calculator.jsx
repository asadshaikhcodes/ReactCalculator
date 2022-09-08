import React, { useState } from "react";
import { Col, Row, Button, InputNumber, Input } from "antd";
//calculator inputs used for rendering on display
const calculatorInputs = [
  [7, 8, 9, "%", "C"],
  [4, 5, 6, "x", "/"],
  [1, 2, 3, "+", "-"],
  [".", 0, "+-", "ENTER"]
];
//calculator contains all the UI components such as button and input
const Calculator = () => {
  //state to store input operations to display
  const [display, setDisplay] = useState("");
  //input 1
  const [input1, setInput1] = useState("");
  //state for storing operator
  const [operator, setOperator] = useState("");
  //input click handler
  const onInputButtonClick = (inputType) => {
    console.log(inputType);
    if (typeof inputType === "number") {
      setDisplay((display === "0" ? "" : display) + inputType);
    } else if (inputType === "." && display.indexOf(".") === -1) {
      setDisplay(display + inputType);
    } else if (inputType === "+-") {
      if (display.indexOf("-") === 0) {
        setDisplay(display.substr(1, display.length));
      } else {
        setDisplay("-" + display);
      }
    } else if (inputType === "C") {
      setDisplay("");
      setInput1("");
      setOperator("");
    } else if (inputType === "ENTER") {
      setDisplay(
        parseFloat(parseFloat(calculate(input1, operator, display)).toFixed(1))
      );
      setInput1("");
      setOperator("");
    } else {
      if (!operator) {
        setInput1(display);
        setDisplay("");
      }
      if (input1 && operator) {
        setInput1(
          parseFloat(
            parseFloat(calculate(input1, operator, display)).toFixed(1)
          )
        );
        setDisplay("");
      }
      setOperator(inputType);
    }
  };
  const buttonStyles = (buttonType) => {
    return {
      backgroundColor: typeof buttonType === "number" ? "#CCE5FF" : "#A2D0FA",
      color: typeof buttonType === "number" ? "#163C5D" : "#4D8AC8",
      fontWeight: 800,
      borderRadius: "5px",
      borderColor: "transparent",
      minWidth: buttonType !== "ENTER" ? "50px" : ""
    };
  };
  let result = "";
  if (input1) {
    result = input1;
  }
  if (operator) {
    result += operator;
  }
  return (
    <div
      style={{
        padding: "10px 10px",
        borderRadius: "5px",
        backgroundColor: "#EBF5FF"
        // margin: "0 auto"
      }}
    >
      <Row
        gutter={8}
        style={{
          backgroundColor: "#CCE5FF",
          // padding: "5px",
          marginBottom: "15px",
          borderRadius: "6px"
        }}
      >
        <Col span={24} block className="gutter-row">
          <Input
            value={result}
            bordered={false}
            readOnly
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={24} block className="gutter-row">
          <Input
            value={display}
            bordered={false}
            readOnly
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      {calculatorInputs.map((row, rowIndex) => {
        return (
          <Row
            justify={
              rowIndex === row.length - 1 ? "space-between" : "space-between"
            }
          >
            {row.map((input) => {
              return (
                <Col
                  span={
                    rowIndex === row.length - 1 && input !== "ENTER"
                      ? 4
                      : input === "ENTER"
                      ? 8
                      : 24 / row.length
                  }
                  style={{
                    marginBottom: "8px"
                  }}
                  block
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => onInputButtonClick(input)}
                    style={buttonStyles(input)}
                  >
                    {input}
                  </Button>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};
export default Calculator;

//get percentage value
const getPercentage = (num1, num2) => {
  let result = (num1 / 100) * num2;
  return result;
};
function calculate(input1, operator, input2) {
  switch (operator) {
    case "+":
      return Number(input1) + Number(input2) + "";
    case "-":
      return Number(input1) - Number(input2) + "";
    case "*":
      return Number(input1) * Number(input2) + "";
    case "/":
      if (input1 == "0" || input2 == "0") {
        break;
      } else {
        return Number(input1) / Number(input2) + "";
      }
    case "%":
      return getPercentage(Number(input1), Number(input2));
    default:
      break;
  }
}
