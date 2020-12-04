import { SlowBuffer } from "buffer";
import { pseudoRandomBytes } from "crypto";
import fs from "fs";
import path from "path";

console.clear();
const inputFile = path.join(path.dirname(__filename), "input.txt");
const content = fs.readFileSync(inputFile, "utf-8");
const input = content.split(/\r?\n/);

const slope = { right: 3, down: 1 };
const slopes: string[][] = input.map((row) => row.split(""));
const bounds = {
  top: 0,
  left: 0,
  bottom: slopes.length - 1,
  right: slopes[0].length - 1,
};

let pos = { y: 0, x: 0, virtualX: 0 };
const boxLength = bounds.right + 1;

let trees = 0;

console.log({ state: "init", ...pos, bounds, boxLength, trees });

while (pos.y <= bounds.bottom) {
  if (slopes[pos.y][pos.x] === "#") {
    trees++;
  }
  
  // calculate next pos
  pos.y += slope.down;
  pos.virtualX += slope.right;

  const box = Math.floor(pos.virtualX / boxLength);
  pos.x = pos.virtualX - (box * boxLength);
  console.log({ state: "next", ...pos, box, trees });
}

console.log(trees);
