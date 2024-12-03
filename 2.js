const fs = require("fs")
const input = fs
  .readFileSync("./inputs/2.txt", "utf8")
  .trim()
  .split("\n")
  .map(reading => reading.split(" ").map(num => parseInt(num)))

function isReadingSafe(reading) {
  const isAscending = reading.every((value, i) => i === 0 || (value > reading[i - 1] && value - reading[i - 1] <= 3))
  const isDecreasing = reading.every((value, i) => i === 0 || (value < reading[i - 1] && reading[i - 1] - value <= 3))

  return isAscending === true ? true : isDecreasing ? true : false
}

function calculateSafeReadings() {
  return input.reduce((total, current) => (isReadingSafe(current) ? total + 1 : total), 0)
}

// final output (solution 1)
console.log(`Solution 1: ${calculateSafeReadings()}`)
