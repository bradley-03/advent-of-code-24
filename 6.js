const fs = require("fs")
const input = fs
  .readFileSync("./inputs/6.txt", "utf8")
  .trim()
  .split("\n")
  .map(line => line.split(""))

function getGuardInfo() {
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      switch (input[row][col]) {
        case "^":
          return { coordinates: [row, col], facing: "north" }
        case ">":
          return { coordinates: [row, col], facing: "east" }
        case "v":
          return { coordinates: [row, col], facing: "south" }
        case "<":
          return { coordinates: [row, col], facing: "west" }
        default:
          break
      }
    }
  }
  console.log("No guard found, marking complete.")
  return { coordinates: [0, 0], facing: "north", complete: true }
}

let guardInfo = getGuardInfo()

function moveGuard() {
  guardInfo = getGuardInfo()
  if (guardInfo.complete === true) {
    return true
  }
  if (guardInfo.facing === "north") {
    const col = guardInfo.coordinates[1]
    for (let row = guardInfo.coordinates[0]; row >= 0; row--) {
      if (input[row - 1] && input[row - 1][col] === "#") {
        // console.log("Hit barrier moving North")
        input[row][col] = ">"
        break
      } else {
        input[row][col] = "X"
      }
    }
    return
  }
  if (guardInfo.facing === "east") {
    const row = guardInfo.coordinates[0]
    for (let col = guardInfo.coordinates[1]; col < input[row].length; col++) {
      if (input[row][col + 1] === "#") {
        // console.log("Hit barrier moving East")
        input[row][col] = "v"
        break
      } else {
        input[row][col] = "X"
      }
    }
    return
  }
  if (guardInfo.facing === "south") {
    const col = guardInfo.coordinates[1]
    for (let row = guardInfo.coordinates[0]; row < input.length; row++) {
      if (input[row + 1] && input[row + 1][col] === "#") {
        // console.log("Hit barrier moving South")
        input[row][col] = "<"
        break
      } else {
        input[row][col] = "X"
      }
    }
    return
  }
  if (guardInfo.facing === "west") {
    const row = guardInfo.coordinates[0]
    for (let col = guardInfo.coordinates[1]; col >= 0; col--) {
      if (input[row][col - 1] === "#") {
        // console.log("Hit barrier moving West")
        input[row][col] = "^"
        break
      } else {
        input[row][col] = "X"
      }
    }
    return
  }
}

function calculatePositions() {
  while (moveGuard() === undefined) {
    moveGuard()
  }
  let total = input.flatMap(line => line.filter(point => point === "X")).length
  return total
}

// Solution 1 output
console.log(`Solution 1: ${calculatePositions()}`)
