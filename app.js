
// getting Elements by ClassName and creating arrays from them
let num = document.getElementsByClassName("numbers");
let numArray = Array.from(num);
let operator = document.getElementsByClassName("operators");
let operatorArray = Array.from(operator);


// getting Elements by Id 
let result = document.getElementById("result");
let firstWindow = document.getElementById("firstWindow");
let mathOperators = document.getElementById("mathOperators");
let equal = document.getElementById("equal");
let reset = document.getElementById("reset");
let dot = document.getElementById("dot");


// creating variable to store data in
let inputs = [];
let operatorInputs = null;
let results = [];
firstWindow.value = null;
mathOperators.value = null;
result.value = null;



// first I map over the operators, and make sure I can click and assign values
operatorArray.map(
  (e) =>
    (e.onclick = () => {
      operatorInputs = e.value;
      mathOperators.value = `${operatorInputs}`;

      //then I map over numbers to get their values for the second time
      numArray.map(
        (e) =>
          (e.onclick = () => {
            //adding dot click Event
            dot.onclick = () => {
              results.push(dot.value);
            };
            //making sure that there are correct length before proceeding 
            if (results.length <= 10) {
              results.push(e.value);
              result.value = `${results.join("")}`;
            }

            if (results.length > 10) {
              results.splice(10, 1, e.value);
              result.value = `${results.join("")}`;
            }
          })
      );
          
      //adding click event on Equal sign
      equal.onclick = () => {
        //making error statements
        if (inputs.length === 0) {
          firstWindow.value = "ERROR";
          //disables
          numArray.map((e) => (e.disabled = true));
          operatorArray.map((e) => (e.disabled = true));
          equal.disabled = true;
          dot.disabled = true
        }

        if (operatorInputs === null) {
          firstWindow.value = "DON'T FORGET MATH OPERATOR!";
          result.value = null;
          //disables
          numArray.map((e) => (e.disabled = true));
          operatorArray.map((e) => (e.disabled = true));
          equal.disabled = true;
          dot.disabled = true
        }

        // creating a function to detect if there were more than one dot
        const inputCounts = {};
        const resultCounts = {};
        results.forEach(function (x) {
          resultCounts[x] = (resultCounts[x] || 0) + 1;
        });

        inputs.forEach(function (x) {
          inputCounts[x] = (inputCounts[x] || 0) + 1;
        });

        //error statement about too many dots
        if (
          inputs.length !== 0 &&
          (inputCounts["."] > 1 || resultCounts["."] > 1)
        ) {
          firstWindow.value = "TOO MANY DOTS";
          result.value = null;
          mathOperators.value = null;
          //disables
          numArray.map((e) => (e.disabled = true));
          operatorArray.map((e) => (e.disabled = true));
          equal.disabled = true;
          dot.disabled = true
        }

        //statement about floating numbers and actually doing math calculations
        if (inputs.length !== 0 && operatorInputs !==null) {
          let calc = inputs.join("") + operatorInputs + results.join("");
          let evaluated = eval(calc);
          console.log(evaluated);
          inputs = [];
          inputs.push(evaluated.toFixed(4));

          //another error statements => numerical values
          if (evaluated > 9999999999999) {
            firstWindow.value = "TOO BIG";
            //disables
            numArray.map((e) => (e.disabled = true));
            operatorArray.map((e) => (e.disabled = true));
            equal.disabled = true;
            dot.disabled = true
          }

          //math calculations
          if (evaluated < 9999999999999 && operatorInputs !== "\\") {
            firstWindow.value = `${evaluated}`;
          }

          if (
            evaluated < 9999999999999 &&
            operatorInputs === "/" &&
            evaluated % 2 !== 0
          ) {
            firstWindow.value = `${evaluated.toFixed(4)}`;
          }

          //resets
          mathOperators.value = null;
          result.value = null;
          operatorInputs = null;
          results = [];
        }
      };
    })
);



//getting values for the first time, without clicking operator
numArray.map(
  (e) =>
    (e.onclick = () => {
      dot.onclick = () => {
        inputs.push(dot.value);
      };

      if (inputs.length <= 10) {
        inputs.push(e.value);
        firstWindow.value = `${inputs.join("")}`;
      }

      if (inputs.length > 10) {
        inputs.splice(10, 1, e.value);
        firstWindow.value = `${inputs.join("")}`;
      }
    })
);


//reset
reset.onclick = () => {
  //resetting values
  inputs = [];
  operatorInputs = null;
  results = [];
  firstWindow.value = null;
  mathOperators.value = null;
  result.value = null;

  numArray.map(
    (e) =>
      (e.onclick = () => {
        dot.onclick = () => {
          inputs.push(dot.value);
        };

        if (inputs.length <= 10) {
          inputs.push(e.value);
          firstWindow.value = `${inputs.join("")}`;
        }

        if (inputs.length > 10) {
          inputs.splice(10, 1, e.value);
          firstWindow.value = `${inputs.join("")}`;
        }
      })
  );
  
  //removing disables
  numArray.map((e) => (e.disabled = false));
  operatorArray.map((e) => (e.disabled = false));
  equal.disabled = false;
  dot.disabled = false;
};
