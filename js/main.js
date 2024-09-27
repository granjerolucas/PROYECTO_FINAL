import { calcMortgage, onInput, onKeyPress } from "./utils.js";

const inputsControl = document.querySelectorAll(".control-number");
const formCalculator = document.querySelector("#formCalculator");

inputsControl.forEach((input) => {
  input.addEventListener("keypress", onKeyPress);
  input.addEventListener("input", onInput);
});

formCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
  const res = calcMortgage(300000, 5.25, 25);
  console.log(res);
  let goSubmit = true;
  const formData = new FormData(e.target);
  const el = e.target.elements;
  for (let i = 0; i < el.length; i++) {
    if (["input"].includes(el.item(i).tagName.toLowerCase())) {
      if (el.item(i).checkValidity()) {
        console.log("valid");
      } else {
        // console.log(el.item(i).validationMessage)
        const err = document.querySelector(`#error-${el.item(i).name}`);
        if (err) {
          goSubmit = false;
          // err.innerHTML = el.item(i).validationMessage
          err.classList.add("d-block");
          setTimeout(() => {
            err.classList.remove("d-block");
          }, 5000);
        }
      }
    }
  }
  if (goSubmit) {
    calcMortgage(300000, 5.25, 25, 'interest-only');
  }
});
