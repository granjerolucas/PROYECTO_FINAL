import { calcMortgage, clearNumber, onInput, onKeyPress } from "./utils.js";

const inputsControl = document.querySelectorAll(".control-number");
const formCalculator = document.querySelector("#formCalculator");
const btnClear = document.querySelector(".btn-clear");
const resUnique = document.querySelector(".result-value-unique");
const resAcumulated = document.querySelector(".result-value-acumulated");
const resContentHome = document.querySelector(".result-content-home");

btnClear.addEventListener("click", () => {
  formCalculator.reset();
  resUnique.innerHTML = ``;
  resAcumulated.innerHTML = ``;
  resContentHome.classList.add("justify-content-center");
  resContentHome.querySelector(".show-results").classList.add("d-none");
  resContentHome.querySelector(".show-home").classList.remove("d-none");
});
inputsControl.forEach((input) => {
  input.addEventListener("keypress", onKeyPress);
  input.addEventListener("input", onInput);
});

formCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
  // const res = calcMortgage(300000, 5.25, 25);
  // console.log(res);
  let goSubmit = true;
  const formData = new FormData(e.target);
  const el = e.target.elements;
  for (let i = 0; i < el.length; i++) {
    if (["input"].includes(el.item(i).tagName.toLowerCase())) {
      if (!el.item(i).checkValidity()) {
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
    const res = calcMortgage(
      clearNumber(el.amount.value, true),
      clearNumber(el.interest.value, true),
      clearNumber(el.term.value, true),
      el.mortgagetype.value
    );
    resUnique.innerHTML = `£${res.unique}`;
    resAcumulated.innerHTML = `£${res.acumulated}`;
    resContentHome.classList.remove("justify-content-center");
    resContentHome.querySelector(".show-results").classList.remove("d-none");
    resContentHome.querySelector(".show-home").classList.add("d-none");
  }
});
