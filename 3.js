const fs = require("fs")
const input = fs.readFileSync("./inputs/3.txt", "utf8").trim()

const mulRegexPattern = /mul\(\d+,\d+\)/g

function executeMul(str) {
  const extractedNums = str.substring(str.indexOf("(") + 1, str.indexOf(")"))
  const parsedNums = extractedNums.split(",").map(num => parseInt(num))

  return parsedNums[0] * parsedNums[1]
}

function calculateMulCommands() {
  const commands = input.match(mulRegexPattern)

  const finalTotal = commands.reduce((total, current) => total + executeMul(current), 0)
  return finalTotal
}

// final output Solution 1
console.log(`Solution 1: ${calculateMulCommands()}`)
