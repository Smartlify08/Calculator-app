// Classes -
// Calculation
// Displaying to the dom
// Buttons

const keys = document.querySelectorAll(".key");

class Calculation {
  static Add(...nums) {
    const result = nums.reduce(
      (acc, current) => parseFloat(acc) + parseFloat(current),
      0
    );
    return result;
  }

  static Subtract(...nums) {}

  static Divide(...nums) {}

  static Multiply() {}
}

class UI {}

function Add(...nums) {
  const result = nums.reduce((acc, current) => {
    return parseFloat(acc) + parseFloat(current);
  }, 0);
  return result;
}

console.log(Add("1", "2", "3", "4", "5", "6", "7", "7"));

function updateArr(value, arr) {
  arr.push(value);
  arr.join("");
  console.log(arr);
}

const store = [];

const newArr = [];

let storeStr = "";
function updateString(value, str) {
  return str + value;
}
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const newValue = e.target.textContent;

    updateArr(newValue, store);
    storeStr = updateString(newValue, storeStr);
    let splitted = storeStr.split("+");
    //Check for duplicate Sign
    if (splitted.includes("")) {
      let filtered = splitted.filter((element) => element !== "");
      console.log(Add(...filtered));
    }
  });
});

const str = "12++2+3+123+1+2345+11+123+503++2++1+1++2";
console.log(str.length);

let arr_2 = str.split("+");
// Check for duplicate Sign
if (arr_2.includes("")) {
  let filtered = arr_2.filter((el) => {
    return el !== "";
  });
  console.log(Add(...filtered));
}
console.log(arr_2);
