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
  console.log(checkValue);
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

export function clearNumber(value, force = false) {
  return force ? +value.replace(/,/g, "") : value.replace(/,/g, "");
}

/**
 * Reformatear valores del input y agregar como
 * @param { InputEvent  } e
 */
export const onInput = (e) => {
  console.log("inpu");
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

  console.log(numInt, numDec);
  console.log(newValue)

  if (newValue[newValue.length - 1] === ",") {
    newValue.pop();
  }
  console.log(newValue)
  const formatValue = newValue.reverse().join("");
  // if (numDec)
  if (numDec != undefined) {
    e.target.value = `${formatValue}.${numDec}`;
  } else {
    e.target.value = formatValue;
  }
};

export const calcMortgage = (P, rate, years, type = "repayment") => {
  const r = rate / 100 / 12;
  const n = years * 12;

  const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  if (type === "interest-only") {
    let i = M - P / n;
    return {
      unique: +i.toFixed(2),
      acumulated: +(i * n).toFixed(2),
    };
  } else {
    return {
      unique: +M.toFixed(2),
      acumulated: +(M * n).toFixed(2),
    };
  }
};
