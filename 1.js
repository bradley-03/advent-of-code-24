const fs = require("fs")
const input = fs.readFileSync("./inputs/1.txt", "utf8").trim().split("\n")

const list1 = []
const list2 = []

function splitLineToLists(line) {
  const locNumbers = line.split("   ")
  list1.push(parseInt(locNumbers[0]))
  list2.push(parseInt(locNumbers[1]))
}

// split & populate both lists
for (let line of input) {
  splitLineToLists(line)
}

// sort lists from smallest to largest
const sortedList1 = list1.sort((a, b) => a - b)
const sortedList2 = list2.sort((a, b) => a - b)

// calculate distance between both lists, add totals
let totalDistance = 0

function calculateDistance(num1, num2) {
  return Math.abs(num1 - num2)
}

for (i = 0; i < input.length; i++) {
  const distance = calculateDistance(sortedList1[i], sortedList2[i])

  totalDistance += distance
}

// final output (solution 1)
console.log(`Solution 1: ${totalDistance}`)

let similarityScore = 0

function getNumCountFromList(num) {
  return sortedList2.reduce((total, current) => (current === num ? total + 1 : total), 0)
}

for (let number of sortedList1) {
  const numCount = getNumCountFromList(number)
  similarityScore += number * numCount
}

// final output (solution 2)
console.log(`Solution 2: ${similarityScore}`)
