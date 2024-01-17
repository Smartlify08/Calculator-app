const currentOperandText = document.querySelector(".current-operand");

const signs = document.querySelectorAll(".sign");
const numbers = document.querySelectorAll(".number");
const equals = document.querySelector(".equals");
const resetBtn = document.querySelector(".reset");
const deleteBtn = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");
const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keypad");
const title = document.querySelector(".app-title");
const text = document.querySelectorAll("p");

// Set value to default

let defaultValue = "0";
currentOperandText.textContent = defaultValue;

// Event Listener for entered numbers
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (currentOperandText.textContent === "Cannot be divided by zero") {
      currentOperandText.textContent = number.textContent;
    } else {
      appendNumbers(number.textContent);
    }
  });
});

signs.forEach((sign) => {
  sign.addEventListener("click", () => {
    if (currentOperandText.textContent === "Cannot be divided by zero") {
      currentOperandText.textContent = "0";
    }

    appendSign(sign.textContent);
    evaluateOperation(sign.textContent);
  });
});

decimal.addEventListener("click", () => {
  const currentOperand = currentOperandText.textContent;

  if (
    currentOperand === "" ||
    currentOperand.charAt(currentOperand.length - 1) !== decimal.textContent
  ) {
    // If the conditions are met, add the decimal
    currentOperandText.textContent += decimal.textContent;
  }
});

let numericResult = 0;

equals.addEventListener("click", () => {
  let storeStr = currentOperandText.textContent;
  if (currentOperandText.textContent.includes("x")) {
    storeStr = storeStr.replace("x", "*");
  }
  // Evaluate storeStr, check if leftOperand includes a comma, split it and join.
  let leftHandOperand = storeStr
    .slice(0, storeStr.indexOf(" ") + 1)
    .split(",")
    .join("");
  let remainingText = storeStr.slice(
    storeStr.indexOf(" ") + 1,
    storeStr.length
  );

  // Attach the leftOperand and remaining text to complete the string
  storeStr = leftHandOperand + remainingText;

  numericResult = eval(storeStr.replace(",", ""));

  if (numericResult === Infinity) {
    currentOperandText.textContent = "0";
    currentOperandText.textContent = "Cannot be divided by zero";
  }
  // Format numericResult to a localeString
  else {
    let formattedResult = formatNumber(numericResult);
    currentOperandText.textContent = formattedResult;
  }
});
deleteBtn.addEventListener("click", deleteText);
resetBtn.addEventListener("click", reset);

// Append numbers to screen
function appendNumbers(number) {
  currentOperandText.textContent === defaultValue
    ? (currentOperandText.textContent = number)
    : (currentOperandText.textContent += number);
  if (currentOperandText.textContent.includes(",")) {
    currentOperandText.textContent = currentOperandText.textContent.replace(
      ",",
      ""
    );
  }
}

// Append sign to screen

function appendSign(sign) {
  let str = "";
  let firstOccurenceOfSign = currentOperandText.textContent.indexOf(sign);
  currentOperandText.textContent = `${currentOperandText.textContent} ${sign} `;
  if (currentOperandText.textContent.includes(",")) {
    currentOperandText.textContent = currentOperandText.textContent.replace(
      ",",
      ""
    );
  }
}

/**
 * Evaluate the mathematical operation based on the given sign.
 * Update the currentOperandText with the result and format it for display.
 * @param {string} sign - The mathematical operation sign(+,-,/,*)
 */

function evaluateOperation(sign) {
  let firstOccurenceOfSign = currentOperandText.textContent.indexOf(sign);
  let rightHandOperand = currentOperandText.textContent.slice(
    firstOccurenceOfSign + 1,
    currentOperandText.textContent.length - 1
  );
  let leftHandOperand = currentOperandText.textContent.slice(
    0,
    firstOccurenceOfSign
  );

  let formattedLeftHandOperand = leftHandOperand.split(",").join("");
  if (isNaN(rightHandOperand)) {
    let typeOfSign = currentOperandText.textContent.slice(
      firstOccurenceOfSign,
      firstOccurenceOfSign + 1
    );
    if (typeOfSign === "+" || typeOfSign === "-") {
      rightHandOperand = rightHandOperand.replace(sign, "0");
    } else {
      rightHandOperand = rightHandOperand.replace(sign, "1");
    }
  }
  if (rightHandOperand !== "") {
    let result;
    switch (sign) {
      case "+":
        result =
          parseFloat(formattedLeftHandOperand) + parseFloat(rightHandOperand);
        break;
      case "-":
        result =
          parseFloat(formattedLeftHandOperand) - parseFloat(rightHandOperand);
        break;
      case "/":
        result =
          parseFloat(formattedLeftHandOperand) / parseFloat(rightHandOperand);
        break;
      case "x":
        result =
          parseFloat(formattedLeftHandOperand) * parseFloat(rightHandOperand);
        break;
      default:
        break;
    }
    if (result === Infinity) {
      currentOperandText.textContent = "Cannot be divided by zero";
    } else {
      let formattedResult = formatNumber(result);
      currentOperandText.textContent = formattedResult;
    }
  }
}

/**
 *
 * @param {number} number - The numeric value to be formatted
 * @returns {string} - The formatted string with commas for better readablility
 */

function formatNumber(number) {
  let formattedNumber = number.toLocaleString();
  return formattedNumber;
}

function reset() {
  currentOperandText.textContent = "0";
  return;
}

/**
 * Delete the last character from the current operand text
 * If the operand becomes empty set it to "0"
 */

function deleteText() {
  // Check if the current operand is not "0"
  if (currentOperandText.textContent !== "0") {
    // Remove the last character
    let remainingText = currentOperandText.textContent.slice(
      0,
      currentOperandText.textContent.length - 1
    );
    if (remainingText.endsWith(" ")) {
      remainingText = remainingText.slice(0, -1);
    }
    if (remainingText.endsWith(",")) {
      remainingText = remainingText.slice(0, -1);
    }
    if (
      remainingText !== "0" &&
      remainingText.includes(",") &&
      remainingText.length < 5
    ) {
      // Update the current operand text
      remainingText = remainingText.replace(",", "");
    }
    if (remainingText === "") {
      currentOperandText.textContent = "0";
    }

    currentOperandText.textContent = remainingText;
  } else {
    // If the current operand text is already "0", do nothing
    return;
  }
}
