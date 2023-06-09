// Get the elements from the HTML
const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let preView = document.getElementById("pre-view");
// Create variables for the calculator
let operand1 = "0";
let operand2 = "";
let operator = "";
let answer = "0";
let count = null;
let dotCounter = true;
let answerSwitch = false;

// Add click event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.innerText;

    // Check if the button clicked is a number
    if (!isNaN(buttonValue) || buttonValue === "." && dotCounter === true) {
      answerSwitch = false;
      if (buttonValue === ".")
        dotCounter = false;
      if (operator === "") {
        if (operand1 === "0")
          operand1 = "";
        operand1 += buttonValue;
        result.innerText = operand1;
        count = 0;
      } else {
        operand2 += buttonValue;
        result.innerText = operand2;
        count = 1;
      }
    }

    // Check if the button clicked is an operator
    if (buttonValue === "+" || buttonValue === "-" || buttonValue === "×" || buttonValue === "÷" || buttonValue === "%") {
      operator = buttonValue;
      result.innerText = "";
      if (answerSwitch) {
        operand1 = answer;
      }
      preView.innerHTML = operand1 + " " + operator;
      dotCounter = true;
    }

    // Check if the button clicked is the equals sign
    if (buttonValue === "=") {
      const num1 = parseFloat(operand1);
      const num2 = parseFloat(operand2);
      count = 3;
      // Perform the operation based on the operator
      switch (operator) {
        case "+":
          answer = num1 + num2;
          break;
        case "-":
          answer = num1 - num2;
          break;
        case "×":
          answer = num1 * num2;
          break;
        case "÷":
          if (num1 === 0)
            answer = "infinity"
          else
            answer = num1 / num2;
          break;
        default:
          break;
      }
      // Display the result
      result.innerText = answer;
      preView.innerText = num1 + operator + num2;
      // Reset the variables
      // operand1 = answer;
      operand1 = "";
      operand2 = "";
      operator = "";
      answerSwitch = true;
    }
    // Check if the button backspace (C) is the clear button
    if (buttonValue === "C") {
      if (count === 0) {
        operand1 = operand1.slice(0, -1);
        result.innerText = result.innerText.slice(0, -1);
      } else if (count === 1) {
        operand2 = operand2.slice(0, -1);
        result.innerText = result.innerText.slice(0, -1);
      } else if (count === 3) {
        operand1 = 0;
        result.innerText = "0";
        preView.innerText = "0";
      }

      if (result.innerText === "") {
        result.innerText = '0';
        operand1 = 0;
      }
    }

    // Check if the button clicked (AC) is the clear button
    if (buttonValue === "AC") {
      result.innerText = "";
      operand1 = "0";
      operand2 = "";
      operator = "";
      answer = "0";
      preView.innerText = "";
      count = null;
      dotCounter = true;
    }
  });
});