// Calc buttons Accessibility

const CalcAccessibilityControl = (event) => {
  const keyPressed = event.key.toLocaleLowerCase();
  const multiplyListOptions = ["x", "*"];
  const divideListOptions = ["/", "÷"];
  const deleteListOptions = ["delete", "backspace"];

  if (!isNaN(Number(keyPressed)) || keyPressed === ".") {
    document.querySelector(`[data-key="${keyPressed}"]`).click();
  } else if (multiplyListOptions.includes(keyPressed)) {
    document.querySelector(`[data-key="x"]`).click();
  } else if (divideListOptions.includes(keyPressed)) {
    document.querySelector(`[data-key="/"]`).click();
  } else if (keyPressed === "+") {
    document.querySelector(`[data-key="+"]`).click();
  } else if (keyPressed === "-") {
    document.querySelector(`[data-key="-"]`).click();
  } else if (
    (keyPressed === "enter" && event.target === bodyElement) ||
    keyPressed === "="
  ) {
    equalButton.click();
  } else if (keyPressed === "enter" && event.target === themeButton) {
    themeButton.click();
  } else if (deleteListOptions.includes(keyPressed)) {
    document.querySelector(`[data-type="del"]`).click();
  } else if (keyPressed === "c") {
    document.querySelector(`[data-type="reset"]`).click();
  }
};

window.addEventListener("keydown", CalcAccessibilityControl);
