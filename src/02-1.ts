import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.resolve(__filename).replace(".ts", ".input");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/);

const parsingRegex = /(?<lower>\d+)-(?<upper>\d+) (?<condition>\w): (?<password>\w+)/;

let answer = input.filter((line) => {
  const parsingMatches = line.match(parsingRegex);
  if (parsingMatches && parsingMatches.groups) {
    const { lower, upper, condition, password } = parsingMatches.groups;

    const conditionRegex = new RegExp(condition, "g");
    const conditionMatches = password.match(conditionRegex);
    const numMatches = conditionMatches?.length;
    return (
      numMatches &&
      numMatches >= parseInt(lower) &&
      numMatches <= parseInt(upper)
    );
  }
}).length;

console.log(answer);
