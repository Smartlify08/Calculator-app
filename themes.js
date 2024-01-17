/*
Theme Switching 
*/

const theme_switcher = document.querySelector(".toggle-bg-btn");
const circle = document.querySelector(".circle");
circle.classList.add(".theme-toggle");
const appTitle = document.querySelector(".app-title");
const theme = document.querySelectorAll(".toggle-bg-btn>p");

// Theme data
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
      keyBtnShadow: "0px 3px 0px 0px hsl(28, 16%, 65%)",
      resetBtnShadow: "0px 3px 0px 0px hsl(224, 28%, 35%)",
      equalsBtnShadow: "0px 3px 0px 0px hsl(6, 70%, 34%)",
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

    hover: {
      resetBtnBg: "#62B5BD",
      equalsBtnBg: "#FF8B38",
      keyBtnBg: "#fff",
    },

    shadow: {
      keyBtnShadow: "0px 3px 0px 0px hsl(35, 11%, 61%)",
      resetBtnShadow: "0px 3px 0px 0px hsl(185, 58%, 25%)",
      equalsBtnShadow: "0px 3px 0px 0px hsl(25, 99%, 27%)",
    },
  },
  theme_3: {
    backgroundColor: "var(--theme-3-bg)",
    keyBgColor: "var(--theme-3-key-bg-2)",
    equalsBtnColor: "var(--theme-3-key-bg-1)",
    resetBtnColor: "var(--theme-3-key-bg-3)",
    screenBg: "var(--theme-3-screen-bg)",
    keyTextColor: "var(--theme-3-text-light-yellow)",
    textColor: "var(--theme-3-text-light-yellow)",
    keyPadBg: "var(--theme-3-keypad-bg)",

    hover: {
      resetBtnBg: "#8631B0",
      equalsBtnBg: "#94FFF9",
      keyBtnBg: "#6B34AC",
    },

    shadow: {
      keyBtnShadow: "0px 3px 0px 0px hsl(290, 70%, 36%)",
      resetBtnShadow: "0px 3px 0px 0px hsl(285, 91%, 52%)",
      equalsBtnShadow: "0px 3px 0px 0px hsl(177, 92%, 70%)",
    },
  },
};
let currentTheme = "";

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

  function setButtonStyles(button, isResetOrDelete = false, isEquals = false) {
    button.style.boxShadow = isResetOrDelete
      ? shadow.resetBtnShadow
      : isEquals
      ? shadow.equalsBtnShadow
      : shadow.keyBtnShadow;
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = isResetOrDelete
        ? hover.resetBtnBg
        : isEquals
        ? hover.equalsBtnBg
        : hover.keyBtnBg;
    });

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = isResetOrDelete
        ? resetBtnColor
        : isEquals
        ? equalsBtnColor
        : keyBgColor;
    });
  }
  numbers.forEach((number) => {
    number.style.backgroundColor = keyBgColor;
    number.style.color = keyTextColor;
    setButtonStyles(number);
  });
  signs.forEach((sign) => {
    sign.style.backgroundColor = keyBgColor;
    sign.style.color = keyTextColor;

    setButtonStyles(sign);
  });
  text.forEach((p) => {
    p.style.color = textColor;
  });
  resetBtn.style.backgroundColor = resetBtnColor;
  resetBtn.style.boxShadow = shadow.resetBtnShadow;
  setButtonStyles(resetBtn, true);
  equals.style.backgroundColor = equalsBtnColor;
  setButtonStyles(equals, false, true);
  deleteBtn.style.backgroundColor = resetBtnColor;
  setButtonStyles(deleteBtn, true);
  decimal.style.backgroundColor = keyBgColor;
  decimal.style.color = keyTextColor;
  setButtonStyles(decimal);

  screen.style.backgroundColor = screenBg;
  theme_switcher.style.backgroundColor = keypad.style.backgroundColor =
    keyPadBg;
  currentOperandText.style.color = textColor;
  document.body.style.background = backgroundColor;
  circle.style.backgroundColor = equalsBtnColor;
  appTitle.style.color = textColor;
}

function switchTheme(index) {
  circle.style.left = index === 1 ? 22 + "px" : index === 2 ? 40 + "px" : "";
  if (index === 0) {
    currentTheme = "theme_1";
  } else if (index === 1) {
    currentTheme = "theme_2";
  } else if (index === 2) {
    currentTheme = "theme_3";
  } else {
    currentTheme = "theme_1";
  }

  updateTheme();
}
theme.forEach((theme, index) => {
  theme.addEventListener("click", (e) => {
    switchTheme(index);
  });
});
