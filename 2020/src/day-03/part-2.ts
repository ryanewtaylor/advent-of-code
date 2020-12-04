import { SlowBuffer } from "buffer";
import { pseudoRandomBytes } from "crypto";
import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.join(path.dirname(__filename), "input.txt");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/);

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];
const grid: string[][] = input.map((row) => row.split(""));
const bounds = {
  top: 0,
  left: 0,
  bottom: grid.length - 1,
  right: grid[0].length - 1,
};
const boxLength = bounds.right + 1;

let treesArray: number[] = [];

for (const slope of slopes) {
  let pos = { y: 0, x: 0, virtualX: 0 };
  let trees = 0;
  while (pos.y <= bounds.bottom) {
    if (grid[pos.y][pos.x] === "#") {
      trees++;
    }

    // calculate next pos
    pos.y += slope.down;
    pos.virtualX += slope.right;
    const box = Math.floor(pos.virtualX / boxLength);
    pos.x = pos.virtualX - box * boxLength;
  }

  treesArray.push(trees);
}

const answer = treesArray.reduce((prev, curr) => {
  return prev * curr;
}, 1);

console.log({ treesArray, answer });
