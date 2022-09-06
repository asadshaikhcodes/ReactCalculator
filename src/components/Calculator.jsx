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
  // input2 is last entered input except for first time
  const [input2, setInput2] = useState("");

  //state for calculation result
  const [result, setResult] = useState("");

  //state for storing operator
  const [operator, setOperator] = useState("");

  //input click handler
  const onInputButtonClick = (inputType) => {
    // let inputDisplay = `${display ? display + " " + inputType : inputType}`;
    // setDisplay(inputDisplay);
    if (inputType === "ENTER") {
      //input1 is taken as initial input
      //once input1 is resolved with result in initial operation
      //further operation will be evaluated on result
      //checking if ENTER was pressed on first time directly
      if (!result && !input2 && !input1 && !operator) {
        return false;
      } else if (input1 && !result && !operator && !input2) {
        return false;
      } else if (result && operator && input2) {
        setResult(result);
      }
      //check if only initial input exist and ENTER was pressed
    }
    switch (inputType) {
      case "C":
        setInput1("");
        // setInput2(null);
        setOperator("");
        setResult(null);
        setDisplay("");
        break;
      case "+":
        if (input1) {
          setOperator(inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        } else {
          break;
        }
        break;
      case "-":
        if (input1) {
          setOperator(inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        } else {
          break;
        }
        break;
      case "/":
        if (input1) {
          setOperator(inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        } else {
          break;
        }
        break;
      case "x":
        if (input1) {
          setOperator(inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        } else {
          break;
        }
        break;
      case ".":
        //append . to input1 on first time
        if (input1 && input1.indexOf(inputType) == -1) {
          setInput1(input1 + inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        }
        break;
      case 0:
        setInput1(`${input1}${inputType}`);
        //set 0 to input2 used in case of 'ENTER'
        setInput2(input2 + inputType);
        setDisplay(`${display ? display + " " + inputType : inputType}`);
        break;
      case "%":
        if (input1) {
          setOperator(inputType);
          setDisplay(`${display ? display + " " + inputType : inputType}`);
        } else {
          break;
        }
        break;
      case "+-":
        setDisplay(`${display ? display + "-" + inputType : inputType}`);
        let negateString =
          input1 && input1.indexOf(inputType) != -1 ? `${"-"}${input1}` : "";
        setInput1(negateString);
        break;
      default:
        //check if numbers are entered in input
        //perform operations
        if (typeof inputType === "number" && !isNaN(inputType)) {
          debugger;
          setDisplay(`${display ? display + " " + inputType : inputType}`);
          if (!input1) {
            setInput1(inputType);
          } else {
            debugger;
            //operations

            //check if an operation is selected
            if (operator) {
              switch (operator) {
                case "+":
                  setResult(parseFloat(input1) + inputType);
                  setInput2(inputType);
                  setInput1("");
                  break;
                case "-":
                  setResult(parseFloat(input1) - inputType);
                  setInput2(inputType);
                  setInput1("");
                  break;
                case "x":
                  setResult(parseFloat(input1) * inputType);
                  setInput2(inputType);
                  setInput1("");
                  break;
                case "/":
                  //break and do nothing if try to divide by 0
                  if (input1 == "0" || inputType == "0") {
                    break;
                  } else {
                    setResult(parseFloat(input1) / inputType);
                    setInput2(inputType);
                    setInput1("");
                  }
                  break;
                case "%":
                  let percentage;
                  percentage = getPercentage(parseFloat(input1), inputType);
                  setResult(percentage);
                  setInput2(inputType);
                  setInput1("");
                  break;
                default:
                  break;
              }
            } else {
              //in case user initially only types numbers
              //it will be concatenated to input1
              //until user selects an operator & further input numbers
              setInput1(`${input1}${inputType}`);
            }
          }
        }
        break;
    }
  };

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
        block
      >
        <Row gutter={8}>
          <Col span={24} block>
            <InputNumber
              value={display}
              bordered={false}
              readOnly
              style={{ textAlign: "left", width: "100%" }}
            />
          </Col>
          <Col span={24} block>
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
              <Col span={inputType === "ENTER" ? 10 : 4} block>
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
