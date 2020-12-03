import { match } from "assert";
import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.join(path.dirname(__filename), "input.txt");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/);

const parsingRegex = /(?<pos1>\d+)-(?<pos2>\d+) (?<condition>\w): (?<password>\w+)/;

let answer = input.filter((line) => {
  const parsingMatches = line.match(parsingRegex);
  if (parsingMatches && parsingMatches.groups) {
    const { pos1, pos2, condition, password } = parsingMatches.groups;
    const index1 = parseInt(pos1) - 1;
    const index2 = parseInt(pos2) - 1;

    const isDifferent = password[index1] !== password[index2];
    const isMatch1 = password[index1] === condition;
    const isMatch2 = password[index2] === condition;
    return isDifferent && (isMatch1 || isMatch2);
  }
}).length;

console.log(answer);
