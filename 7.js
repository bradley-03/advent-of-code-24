const fs = require("fs")
const input = fs
  .readFileSync("./inputs/7.txt", "utf8")
  .trim()
  .split("\n")
  .map(line => {
    const splitLine = line.split(":")
    return {
      target: parseInt(splitLine[0]),
      nums: splitLine[1]
        .trim()
        .split(" ")
        .map(num => parseInt(num)),
    }
  })

function checkPermutation(nums, permutation) {
  const splitPermutation = permutation.split("")
  let calcTotal = nums[0]

  for (let i = 1; i < nums.length; i++) {
    calcTotal = eval(`${calcTotal}${splitPermutation[i - 1]}${nums[i]}`)
  }
  return calcTotal
}

function generatePermutations(current, options, length, results) {
  if (current.length === length) {
    results.push(current.join(""))
    return
  }

  for (let i = 0; i < options.length; i++) {
    current.push(options[i])
    generatePermutations(current, options, length, results)
    current.pop() // Backtrack
  }
}

function checkAllPossibilities(symbols, length) {
  const results = []
  generatePermutations([], symbols, length, results)
  return results
}

let total = 0
for (let line of input) {
  const possibleOrders = checkAllPossibilities(["*", "+"], line.nums.length - 1)
  for (let order of possibleOrders) {
    const orderSum = checkPermutation(line.nums, order)
    if (orderSum === line.target) {
      total += orderSum
      break
    }
  }
}

console.log(total)
