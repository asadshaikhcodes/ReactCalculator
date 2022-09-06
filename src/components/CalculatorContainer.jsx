import React from "react";
import { Card } from "antd";
import Calculator from "./Calculator";

//parent container component
const CalculatorContainer = () => {
  // const additionHandler = (input) => {
  //   let result = input;
  //   if (!isNaN(input)) {
  //     return (result += input);
  //   } else {
  //     return false;
  //   }
  // };

  // const substractionHandler = (input) => {
  //   let result = input;

  //   if (!isNaN(input)) {
  //     return (result -= input);
  //   } else {
  //     return false;
  //   }
  // };

  // const multiplicationHandler = (input) => {
  //   let result = input;
  //   if (!isNaN(input)) {
  //     return (result *= input);
  //   } else {
  //     return false;
  //   }
  // };

  // const divisionHandler = (input) => {
  //   let result = input;
  //   if (!isNaN(input)) {
  //     return (result -= input);
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <Card
      bordered={false}
      style={{
        width: "350px",
        backgroundColor: "#4D8AC8",
        padding: "5px 2px",
        borderRadius: "6px",
        // boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        margin: "10% auto"
      }}
    >
      <Calculator />
    </Card>
  );
};

export default CalculatorContainer;
