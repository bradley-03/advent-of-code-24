const fs = require("fs")
const input = fs.readFileSync("./inputs/3.txt", "utf8").trim()

const mulRegexPattern = /mul\(\d+,\d+\)/g
const mulRegexWithConditions = new RegExp("mul\\(\\d+,\\d+\\)|do\\(\\)|don't\\(\\)", "g")

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

function calculateMulCommandsWithConditions() {
  const commands = input.match(mulRegexWithConditions)

  let enabled = true
  let total = 0
  for (let command of commands) {
    if (command === "do()") {
      enabled = true
    } else if (command === "don't()") {
      enabled = false
    } else if (enabled === true) {
      total += executeMul(command)
    }
  }

  return total
}

// final output Solution 1
console.log(`Solution 1: ${calculateMulCommands()}`)
// final output Solution 2
console.log(`Solution 2: ${calculateMulCommandsWithConditions()}`)
