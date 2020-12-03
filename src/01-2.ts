import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.resolve(__filename).replace(".ts", ".input");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/).map((c) => parseInt(c));

const sum = 2020;
const len = input.length;
const lastIndex = len - 1;

let index1 = 0;
let answer: number = -1;

for (index1; index1 <= lastIndex; index1++) {
  let index2 = index1 + 1;
  for (index2; index2 <= lastIndex; index2++) {
    let index3 = index2 + 1;
    for (index3; index3 <= lastIndex; index3++) {
      const val1 = input[index1];
      const val2 = input[index2];
      const val3 = input[index3];
      const candidate = val1 + val2 + val3;
      if (candidate === sum) {
        answer = val1 * val2 * val3;
        break;
      }
    }

    if (answer !== -1) {
      break;
    }
  }

  if (answer !== -1) {
    break;
  }
}

console.log("answer: " + answer);
