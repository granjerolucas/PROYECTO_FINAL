import { onInput, onKeyPress } from "./utils.js";

const inputsControl = document.querySelectorAll(".control-number");
const formCalculator = document.querySelector("#formCalculator");


inputsControl.forEach((input) => {
  input.addEventListener("keypress", onKeyPress);
  input.addEventListener("input", onInput);
});

formCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('asdasd', e.target)
  const formData = new FormData(e.target);
  console.log(e.target.elements);
  // e.target.elements.forEach((element) => {
  //   console.log(element.name, element.value);
  // });
  const el = e.target.elements
for (let i = 0; i < el.length; i++) {
  // console.log(el[i].name, el[i].value);
  if (['input'].includes(el.item(i).tagName.toLowerCase())) {
    console.log(el.item(i))
    console.log(el.item(i).name, el.item(i).value);
    if (el.item(i).checkValidity()) {
      console.log('valid')
    } else {
      console.log('invalid')
    }
  }
  
}
})