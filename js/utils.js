const regSingleNumber = /([0-9])/;

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Capturar valores del input y condicionar que sea numerico
 * @param { KeyboardEvent  } e
 */
export const onKeyPress = (e) => {
  const checkValue = e.key;

  if (checkValue === ".") {
    if (e.target.value.includes(".")) {
      e.preventDefault();
    }
  } else {
    if (!regSingleNumber.test(checkValue)) {
      e.preventDefault();
    }
  }
};

export function clearNumber(value) {
  return +value.replace(/,/g, "");
}

/**
 * Reformatear valores del input y agregar como
 * @param { InputEvent  } e
 */
export const onInput = (e) => {
  const value = e.target.value;
  const realValue = clearNumber(value);

  const [numInt, numDec] = realValue.toString().split(".");

  let newValue = [];
  numInt
    .split("")
    .reverse()
    .forEach((item, i) => {
      newValue.push(item);
      if ((i + 1) % 3 == 0) {
        newValue.push(",");
      }
    });

  if (newValue[newValue.length - 1] === ",") {
    newValue.pop();
  }
  const formatValue = newValue.reverse().join("");
  // if (numDec)
  if (numDec != undefined) {
    e.target.value = `${formatValue}.${numDec}`;
  } else {
    e.target.value = formatValue;
  }
};
