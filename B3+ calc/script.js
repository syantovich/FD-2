function calc(str) {

  const num = {
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
    ".": true,
    "+": true,
    "-":true
  };
  const simbol = {
    "(": true,
    ")": true,
    "*": true,
    "/": true,
    " ": true
  };
  for (let i = 0; i < str.length; i++) {
    if (!(str[i] in num) && !((str[i] in simbol))) {
      return "В строке содержаться недопустимые символы!";
    }
  }
  //Проверка одинаковое ли количество скобок
  str = str.split(" ").join('').split("");
  let open = 0,
    close = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      open++;
    }
    if (str[i] === ")") {
      close++;
    }
    if (open < close) {
      return "Проверьте скобки";
    }
  }
  if (open != close) {
    return "Проверьте скобки";
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i] in simbol) {
      str.splice(i, 0, "!");
      str.splice(i + 2, 0, "!");
      i += 2;
    }
    if(str[i]=="-"){
      str.splice(i, 0, "!");
      i++;
    }
    if(str[i]=="+"){
      str.splice(i, 0, "!");
      i++;
    }
  }
  str = str.join("").split("!");
  if (str[0] == "") {
    str.shift();
  }
  if (str[str.length - 1] == "") {
    str.pop();
  }
while(str.indexOf("(")!=-1){
  open = str.indexOf("(");
  close = str.length;
  if (open != -1) {
    close = open;
    let kol = 1;
    while (kol != 0) {
      close++;
      if (str[close] == "(") {
        kol++;
      }
      if (str[close] == ")") {
        kol--;
      }

    }
    let nextString = "";
    nextString = str.slice(open + 1, close).join('');
    let end = calc(nextString);
    if (open!=0){open--;}
    str.splice(open,close-open+2,end);

  } else {
    open = 0;
  }
}
  

  let endV = 0;

  while (str.indexOf("*") != -1 || str.indexOf("/") != -1) {
    for (let i = 0; i < str.length; i++) {
      let sim = str[i];
      if (sim == "*") {
        endV = parseFloat(str[i - 1]) * parseFloat(str[i + 1]);
        str.splice(i - 1, 3, `${endV}`);
        i -= 1;

      }
      if (sim == "/") {
        endV = parseFloat(str[i - 1]) / parseFloat(str[i + 1]);
        str.splice(i - 1, 3, `${endV}`);
        i -= 1;
      }
    }
  }
  endV=0;
  for(let i=0;i<str.length;i++){
    let el=parseFloat(str[i]);
    if(el==NaN){continue;}
     endV = endV + el;

  }
  endV=parseFloat(endV.toPrecision(15));
 if (endV==(Infinity)||endV==(-Infinity)){
   endV="Деление на ноль не возможно";
 }else{
    if(isNaN(endV)){
  endV="Ошибка, присутствует неопределенность!";
 }
 }

  return endV;

  //




}
console.log(calc("((0*(42-19+(8-7*(2-1))))/0)-5"));
console.log(79*(42-19+(8-7*(2-1))));
//calc("2-(3+(8*4+4/2))*(4-8)");