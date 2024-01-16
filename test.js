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
  if (!currentOperandText.textContent.includes(".")) {
    currentOperandText.textContent += decimal.textContent;
  }
});

let numericResult = 0;

equals.addEventListener("click", () => {
  let storeStr = currentOperandText.textContent;
  if (currentOperandText.textContent.includes("x".toLowerCase())) {
    storeStr = storeStr.replace("X", "*");
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
}

// Append sign to screen
function appendSign(sign) {
  currentOperandText.textContent = `${currentOperandText.textContent} ${sign} `;
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

// Theme Switching

const theme_switcher = document.querySelector(".toggle-bg-btn");
const circle = document.querySelector(".circle");
circle.classList.add(".theme-toggle");

const theme = document.querySelectorAll(".toggle-bg-btn>p");

const themes = {
  theme_1: {
    backgroundColor: "var(--theme-1-bg)",
    keyBgColor: "var(--theme-1-light-grayish-orange-key-bg)",
    equalsBtnColor: "var(--theme-1-key-bg-toggle)",
    resetBtnColor: "var(--theme-1-key-bg)",
    screenBg: "var(--theme-1-screen-bg)",
    keyTextColor: "var(--theme-1-text-grayish-blue)",
    textColor: "var(--white)",
    keyPadBg: "var(--theme-1-keypad-bg)",
    hover: {
      resetBtnBg: "#a2b3e1",
      equalsBtnBg: "#f96c5b",
      keyBtnBg: "#fff",
    },

    shadow: {
      keyBtnShadow: "0px 3px 0px 0px var(--theme-1-grayish-orange-key-shadow)",
      resetBtnShadow: "0px 3px 0px 0px var(--theme-1-key-shadow-1);",
      equalsBtnShadow: "0px 3px 0px 0px var(--theme-1-key-shadow-2);",
    },
  },
  theme_2: {
    backgroundColor: "var(--theme-2-bg)",
    keyBgColor: "var(--theme-2-key-bg-3)",
    equalsBtnColor: "var(--theme-2-key-bg-2)",
    resetBtnColor: "var(--theme-2-key-bg-1)",
    screenBg: "var(--theme-2-screen-bg)",
    keyTextColor: "var(--theme-2-text-grayish-yellow)",
    textColor: "var(--theme-2-text-grayish-yellow)",
    keyPadBg: "var(--theme-2-keypad-bg)",

    shadow: {
      keyBtnShadow: "0px 3px 0px 0px var(--theme-2-key-shadow-3)",
      resetBtnShadow: "0px 3px 0px 0px var(--theme-2-key-shadow-1)",
      equalsBtnShadow: "0px 3px 0px 0px var(--theme-2-key-shadow-2)",
    },

    hover: {
      resetBtnBg: "#62B5BD",
      equalsBtnBg: "#FF8B38",
      keyBtnBg: "#fff",
    },
  },
  theme_3: {
    backgroundColor: "blue",
  },
};
let currentTheme = "theme_1";

function updateTheme() {
  const {
    backgroundColor,
    keyBgColor,
    keyTextColor,
    resetBtnColor,
    equalsBtnColor,
    textColor,
    screenBg,
    keyPadBg,
    shadow,
    hover,
  } = themes[currentTheme];
  numbers.forEach((number) => {
    number.style.backgroundColor = keyBgColor;
    number.style.color = keyTextColor;
    number.style.boxShadow = shadow.keyBtnShadow;
    number.addEventListener("mouseenter", (e) => {
      number.style.backgroundColor = hover.keyBtnBg;
    });
    number.addEventListener("mouseleave", () => {
      number.style.backgroundColor = keyBgColor;
    });
  });
  signs.forEach((sign) => {
    sign.style.backgroundColor = keyBgColor;
    sign.style.color = keyTextColor;
    sign.style.boxShadow = shadow.keyBtnShadow;

    sign.addEventListener("mouseenter", (e) => {
      sign.style.backgroundColor = hover.keyBtnBg;
    });
    sign.addEventListener("mouseleave", () => {
      sign.style.backgroundColor = keyBgColor;
    });
  });
  text.forEach((p) => {
    p.style.color = textColor;
  });
  resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.backgroundColor = hover.resetBtnBg;
  });
  resetBtn.addEventListener("mouseleave", () => {
    resetBtn.style.backgroundColor = resetBtnColor;
  });

  equals.addEventListener("mouseenter", () => {
    equals.style.backgroundColor = hover.equalsBtnBg;
  });
  equals.addEventListener("mouseleave", () => {
    equals.style.backgroundColor = equalsBtnColor;
  });
  deleteBtn.addEventListener("mouseenter", () => {
    deleteBtn.style.backgroundColor = hover.resetBtnBg;
  });
  deleteBtn.addEventListener("mouseleave", () => {
    deleteBtn.style.backgroundColor = resetBtnColor;
  });

  decimal.style.backgroundColor = keyBgColor;
  decimal.style.boxShadow = shadow.keyBtnShadow;
  decimal.style.color = keyTextColor;
  resetBtn.style.backgroundColor = resetBtnColor;
  resetBtn.style.boxShadow = shadow.resetBtnShadow;
  deleteBtn.style.backgroundColor = resetBtnColor;
  deleteBtn.style.boxShadow = shadow.resetBtnShadow;
  equals.style.backgroundColor = equalsBtnColor;
  equals.style.boxShadow = shadow.equalsBtnShadow;
  screen.style.backgroundColor = screenBg;
  theme_switcher.style.backgroundColor = keypad.style.backgroundColor =
    keyPadBg;
  currentOperandText.style.color = textColor;
  document.body.style.background = backgroundColor;
}
updateTheme();
theme.forEach((theme, index) => {
  theme.addEventListener("click", (e) => {
    circle.style.left = index === 1 ? 22 + "px" : index === 2 ? 40 + "px" : "";
    if (index === 0) {
      currentTheme = "theme_1";
      updateTheme();
    } else if (index === 1) {
      currentTheme = "theme_2";
      updateTheme();
    } else {
      currentTheme = "theme_3";
      updateTheme();
    }
  });
});
