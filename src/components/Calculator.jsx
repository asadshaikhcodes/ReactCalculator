import React, { useState } from "react";
import { Col, Row, Button, InputNumber } from "antd";

//calculator inputs used for rendering on display
const calculatorInputs = [
  7,
  8,
  9,
  "%",
  "C",
  4,
  5,
  6,
  "x",
  "/",
  1,
  2,
  3,
  "+",
  "-",
  ".",
  0,
  "+-",
  "ENTER"
];

//calculator contains all the UI components such as button and input
const Calculator = () => {
  //state to store input operations to display
  const [display, setDisplay] = useState("");

  //input 1
  const [input1, setInput1] = useState("");
  // input 2
  const [input2, setInput2] = useState();

  //state for calculation result
  const [result, setResult] = useState();

  //state for storing operator
  const [operator, setOperator] = useState("");

  //input click handler
  const onInputButtonClick = (inputType) => {
    let inputDisplay = `${display} ${inputType}`;
    setDisplay(inputDisplay);
    switch (inputType) {
      case "C":
        setInput1("");
        setInput2(null);
        setOperator("");
        setResult(null);
        setDisplay("");
        break;
      case "+":
        if (input1 && result) {
          setOperator(inputType);
        } else {
          break;
        }
        break;
      case "-":
        if (input1 && result) {
          setOperator(inputType);
        } else {
          break;
        }
        break;
      case "/":
        if (input1 && result) {
          setOperator(inputType);
        } else {
          break;
        }
        break;
      case "x":
        if (input1 && result) {
          setOperator(inputType);
        } else {
          break;
        }
        break;
      case ".":
        if (input1 && input1.indexOf(inputType) == -1) {
          setInput1(input1 + inputType);
          setDisplay(`${display}${inputType}`);
        } else {
          break;
        }
        break;
      case 0:
        if (input1 && input1.includes(inputType.toString())) {
          break;
        } else {
          setInput1(input1 + inputType);
          setDisplay(`${display} ${inputType}`);
        }
        break;
      case "%":
        if (input1 && result) {
          setOperator(inputType);
        } else {
          break;
        }
        break;
      case "+-":
        break;
      default:
        //check if input is a number and store in state
        if (typeof inputType === "number" && !isNaN(inputType)) {
          let evalvuation;
          debugger;
          if (input1 && operator) {
            setInput2(inputType);
            //operations
            switch (operator) {
              case "+":
                if (result) {
                  setResult((preVal) => parseFloat(preVal + inputType));
                } else {
                  setResult(parseFloat(input1) + inputType);
                }
                //reset input1
                // setInput1(null);
                break;
              case "-":
                if (result) {
                  setResult((preVal) => parseFloat(preVal - inputType));
                } else {
                  setResult(parseFloat(input1) - inputType);
                }
                // setResult(Number(input1) - inputType);
                // //reset input1
                // setInput1(null);
                break;
              case "x":
                if (result) {
                  setResult((preVal) => parseFloat(preVal * inputType));
                } else {
                  setResult(parseFloat(input1) * inputType);
                }
                // setResult(Number(input1) * inputType);
                // //reset input1
                // setInput1(null);
                break;
              case "/":
                if (result) {
                  setResult((preVal) => parseFloat(preVal / inputType));
                } else {
                  setResult(parseFloat(input1) / inputType);
                }
                // setResult(Number(input1) / inputType);
                // //reset input1
                // setInput1(null);
                break;
              default:
                break;
            }
          } else {
            debugger;
            //in case user initially only types numbers
            //it will be concatenated to input1
            //until user selects an operator & input2
            setInput1(input1 + inputType);
          }
        }
        break;
    }
  };

  //set result
  // const onEnterClick = () => {};

  //get percentage value
  const getPercentage = (num1, num2) => {
    let result = (num1 / 100) * num2;
    return result;
  };

  const buttonStyles = (buttonType) => {
    return {
      backgroundColor: typeof buttonType === "number" ? "#CCE5FF" : "#A2D0FA",
      color: typeof buttonType === "number" ? "#163C5D" : "#4D8AC8",
      fontWeight: 800,
      borderRadius: "5px",
      borderColor: "transparent",
      textAlign: "center",
      minWidth: "50px"
    };
  };

  return (
    <Row
      style={{
        padding: "10px 10px",
        borderRadius: "5px",
        backgroundColor: "#EBF5FF",
        margin: "0 auto"
      }}
    >
      <Col
        span={24}
        style={{
          backgroundColor: "#CCE5FF",
          padding: "5px",
          marginBottom: "15px",
          borderRadius: "6px"
        }}
      >
        <Row gutter={8}>
          <Col span={24}>
            <InputNumber
              value={display}
              bordered={false}
              readOnly
              style={{ textAlign: "left", width: "100%" }}
            />
          </Col>
          <Col span={24}>
            <InputNumber
              value={result}
              bordered={false}
              readOnly
              style={{ textAlign: "right", width: "100%" }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} block>
        <Row gutter={[58, 8]}>
          {calculatorInputs.map((inputType) => {
            return (
              <Col span={4} block>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => onInputButtonClick(inputType)}
                  style={buttonStyles(inputType)}
                >
                  {inputType}
                </Button>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default Calculator;
