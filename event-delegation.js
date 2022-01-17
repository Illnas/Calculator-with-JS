let result = document.getElementById("result");
let firstWindow = document.getElementById("firstWindow");
let mathOperators = document.getElementById("mathOperators");
let table = document.getElementById("table");

// creating variable to store data in
let inputs = [];
let operatorInputs = null;
let results = [];
firstWindow.value = null;
mathOperators.value = null;
result.value = null;

function firstWindowNumbers(numbers) {
  if (inputs.length <= 10) {
    inputs.push(numbers);
    firstWindow.value = `${inputs.join("")}`;
  }

  if (inputs.length > 10) {
    inputs.splice(10, 1, numbers);
    firstWindow.value = `${inputs.join("")}`;
  }
}

function secondWindowNumbers(numbers) {
  if (inputs.length <= 10) {
    results.push(numbers);
    result.value = `${results.join("")}`;
  }

  if (inputs.length > 10) {
    results.splice(10, 1, numbers);
    result.value = `${results.join("")}`;
  }
}

function resetFunc() {
  mathOperators.value = null;
  result.value = null;
  operatorInputs = null;
  results = [];
}

function calculating() {
  if (inputs.length === 0 && operatorInputs === null) {
    firstWindow.value = "ERROR";
    inputs = [];
  }

  if (operatorInputs === null && inputs.length !== 0) {
    firstWindow.value = "DON'T FORGET MATH OPERATOR!";
    inputs = [];
  }

  if (result.value === "" && operatorInputs !== null) {
    firstWindow.value = "ERROR";
    mathOperators.value = "";
    inputs = [];
  }

  if (inputs.length !== 0 && operatorInputs !== null) {
    let calc = inputs.join("") + operatorInputs + results.join("");
    let evaluated = eval(calc);
    //console.log(evaluated);
    inputs = [];
    inputs.push(evaluated.toFixed(4));

    //another error statements => numerical values
    if (evaluated > 9999999999999) {
      firstWindow.value = "TOO BIG";
      inputs = [];
    }

    //math calculations
    if (evaluated < 9999999999999 && operatorInputs !== "\\") {
      firstWindow.value = `${evaluated}`;
    }

    if (
      evaluated < 9999999999999 &&
      operatorInputs === "/" &&
      evaluated % 2 !== 0 &&
      evaluated !== evaluated.toFixed(0)
    ) {
      firstWindow.value = `${evaluated.toFixed(4)}`;
    }
    resetFunc();
  }
}


//Onclick Event
table.onclick = (e) => {
  let values = e.target.value; //assigning e.target.values
    
  if (mathOperators.value === "" && e.target.className === "numbers") {
    firstWindowNumbers(values);
  }

  if (e.target.id === "dot") {
    if (firstWindow.value.indexOf(".") === -1) {
      inputs.push(values);
    }
  }

  if (e.target.className === "operators") {
    operatorInputs = values;
    mathOperators.value = `${values}`;
  }

  if (mathOperators.value !== "" && e.target.className === "numbers") {
    secondWindowNumbers(values);
  }

  if (e.target.id === "equal") {
    calculating();
  }

  if (e.target.id === "reset") {
    firstWindow.value = null;
    inputs = [];
    resetFunc();
  }
};
