// values needed:
const calcResultScreen = document.querySelector(".calculator__screen");
const numbersButtons = document.querySelectorAll("[data-type=number]");
const operatorButtons = document.querySelectorAll("[data-type=operator]");
const equalButton = document.querySelector("[data-type=equal]");
const resetButton = document.querySelector("[data-type=reset]");
const delButton = document.querySelector("[data-type=del]");
const allButtons = document.querySelectorAll(".calculator__button");
const bodyElement = document.querySelector("body");
const themeButton = document.querySelector(".themes__label-button");

// calc control system:
const calcMemory = {
  currentNumber: "0",
  firstNumber: null,
  currentOperator: null,
};

const calcFunctions = {
  slicing: function (word) {
    for (let letter of word) {
      if (Boolean(Number(letter)) || letter === ".") {
        return word.indexOf(letter);
      }
    }
  },
  updateScreen: function (number) {
    if (
      typeof number === "string" &&
      number.length > 1 &&
      (!number.includes(".") || number.indexOf(".") > 1)
    ) {
      const sliceIndex = calcFunctions.slicing(number);
      if (sliceIndex) {
        calcResultScreen.innerText = number.slice(sliceIndex);
      } else {
        calcResultScreen.innerText = "0";
      }
    } else if ((!number && number !== 0) || number === Infinity) {
      calcResultScreen.innerText = "ERROR 404";
      setTimeout(() => {
        calcResultScreen.innerText = "Wait for Resetting";
      }, 1500);
      setTimeout(() => resetButton.click(), 6000);
    } else {
      calcResultScreen.innerText = number;
    }

    calcFunctions.screenOverflow(calcResultScreen);
  },
  screenOverflow: function (screen) {
    const whatOnScreen = screen.innerText;
    if (whatOnScreen.length > 18) {
      screen.classList.add("overflow");
    }
  },
  sum: function (num1, num2) {
    return num1 + num2;
  },
  minus: function (num1, num2) {
    return num1 - num2;
  },
  multiply: function (num1, num2) {
    return num1 * num2;
  },
  divide: function (num1, num2) {
    return num1 / num2;
  },
  calcDependOnOperator: function (operator, num1, num2) {
    if (operator === "+") {
      return calcFunctions.sum(num1, num2);
    } else if (operator === "-") {
      return calcFunctions.minus(num1, num2);
    } else if (operator === "x") {
      return calcFunctions.multiply(num1, num2);
    } else if (operator === "/") {
      return calcFunctions.divide(num1, num2);
    }
  },
};

// numbers buttons control:
const numberFunction = (numberClicked) => {
  const numberClickedContent = numberClicked.innerText;
  if (numberClickedContent === "." && calcMemory.currentNumber.includes(".")) {
    console.log(calcMemory.currentNumber);

    return;
  }
  calcMemory.currentNumber += numberClickedContent;
  calcFunctions.updateScreen(calcMemory.currentNumber);
};

numbersButtons.forEach((number) =>
  number.addEventListener("click", () => numberFunction(number))
);

// Main validation function:
const validateThenCalc = (seconedNumber) => {
  if (calcMemory.firstNumber === null) {
    calcFunctions.updateScreen(calcMemory.currentNumber);
    calcMemory.firstNumber = Number(calcMemory.currentNumber);
  } else if (
    calcMemory.firstNumber !== null &&
    calcMemory.currentNumber !== "0"
  ) {
    calcMemory.firstNumber = calcFunctions.calcDependOnOperator(
      calcMemory.currentOperator,
      calcMemory.firstNumber,
      seconedNumber
    );
    calcFunctions.updateScreen(calcMemory.firstNumber);
  }
  calcMemory.currentNumber = "0";
};

// operators buttons control
const operatorFunction = (operator) => {
  calcMemory.currentOperator = operator;
  validateThenCalc(Number(calcMemory.currentNumber));
};

operatorButtons.forEach((operator) =>
  operator.addEventListener("click", () => operatorFunction(operator.innerText))
);

// equal button control
const equalFunction = () => {
  const condition =
    calcMemory.currentNumber === "0"
      ? calcMemory.firstNumber
      : Number(calcMemory.currentNumber);
  validateThenCalc(condition);
};

equalButton.addEventListener("click", equalFunction);

// del button control
const delFunction = () => {
  if (calcMemory.currentNumber.length > 1) {
    calcMemory.currentNumber = calcMemory.currentNumber.slice(0, -1);
    calcFunctions.updateScreen(calcMemory.currentNumber);
  }
};
delButton.addEventListener("click", delFunction);

// reset button control
const resetFunction = () => {
  calcMemory.currentNumber = "0";
  calcMemory.firstNumber = null;
  calcMemory.currentOperator = null;
  calcFunctions.updateScreen(calcMemory.currentNumber);
};

resetButton.addEventListener("click", resetFunction);

// click animitaion

const addAnimitaion = (element) => {
  element.classList.add("click");
  element.classList.add("hover");
};
const removeAnimitaion = (element) => {
  element.classList.remove("click");
  element.classList.remove("hover");
};

allButtons.forEach((button) => {
  button.addEventListener("click", () => addAnimitaion(button));

  button.addEventListener("animationend", () => removeAnimitaion(button));
});
