const fs = require("fs")
const input = fs
  .readFileSync("./inputs/4.txt", "utf8")
  .trim()
  .split("\n")
  .map(line => line.split(""))

function checkSurroundings(row, col) {
  let foundCount = 0
  // check up
  if (row >= 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row - pos][col] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check down
  if (row < input.length - 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row + pos][col] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check forwards
  if (col < input[row].length - 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row][col + pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check backwards
  if (col >= 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row][col - pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check up-left
  if (row >= 3 && col >= 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row - pos][col - pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check up-right
  if (row >= 3 && col < input[row].length - 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row - pos][col + pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check down-left
  if (row < input.length - 3 && col >= 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row + pos][col - pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }
  // check down-right
  if (row < input.length - 3 && col < input[row].length - 3) {
    for (let pos = 0; pos < 4; pos++) {
      if (input[row + pos][col + pos] === "XMAS"[pos]) {
        if (pos === 3) {
          foundCount++
        }
      } else {
        break
      }
    }
  }

  return foundCount
}

let totalWordCount = 0
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row][col] === "X") {
      // console.log("hit", row, col)
      totalWordCount += checkSurroundings(row, col)
    }
  }
}
console.log(totalWordCount)
