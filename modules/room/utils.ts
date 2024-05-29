import { allChars, allNumbers, getRandomInt } from "@/lib/utils";

export function generateShareCode() {
  let code = '';
  let counter = 1;
  while (code.length < 19) {
    if (counter % 5 === 0) {
      code += '-';
    } else {
      const numberOrChar = getRandomInt(2);
      if (numberOrChar === 0) {
        code += allChars[getRandomInt(allChars.length)];
      } else {
        code += allNumbers[getRandomInt(allNumbers.length)];
      }
    }
    counter++;
  }
  return code.toUpperCase();
}