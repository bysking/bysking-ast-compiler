let tokens = [];
const numReg = /[0-9]/;
const typeAll = {
  numberic: "numberic",
  punctuate: "punctuate",
};
let curToken;

function emit(token) {
  curToken = {
    type: "",
    value: "",
  };
  tokens.push(token);
}

function number(char) {
  if (numReg.test(char)) {
    curToken.value += char; // 收集连续出现的数字
    return number;
  } else if (["+", "-"].includes(char)) {
    emit(curToken); // 把之前收集的数字做一个输出

    // 再将当前符号做一个输出
    emit({
      type: typeAll.punctuate,
      value: char,
    });

    // 重置收集状态
    curToken = {
      type: typeAll.numberic,
      value: "",
    };

    return number;
  } else {
    console.log(char, "---");
  }
}

/** 开始状态 */
function start(char) {
  if (numReg.test(char)) {
    curToken = {
      type: typeAll.numberic,
      value: "",
    };
  }
  return number(char);
}

function tokenizer(inputStr) {
  let state = start;

  for (let char of inputStr) {
    state = state(char);
  }

  if (curToken.value.length) {
    emit(curToken);
  }
}

const input = "10+20+30-20";

tokenizer(input);

console.log(tokens);
