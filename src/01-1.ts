import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.resolve(__filename).replace(".ts", ".input");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/).map((c) => parseInt(c));

const sum = 2020;
const sorted = input.sort();
const len = sorted.length;

let fwd = 0;
let answer: number = -1;

for (fwd; fwd < len - 1; fwd++) {
  let rev = len - 1;
  for (rev; rev >= 0; rev--) {
    const leftVal = input[fwd];
    const rightVal = input[rev];
    const candidate = leftVal + rightVal;
    if (candidate === sum) {
      answer = leftVal * rightVal;
      break;
    }
  }

  if (answer !== -1) {
    break;
  }
}

console.log("answer: " + answer);
