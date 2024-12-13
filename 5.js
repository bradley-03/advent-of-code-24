const fs = require("fs")
const input = fs.readFileSync("./inputs/5.txt", "utf8").replace(/\r\n/g, "\n").trim().split("\n\n")

const orderingRules = []

input[0].split("\n").forEach(rule => {
  const splitRule = rule.split("|")
  const foundRuleIndex = orderingRules.findIndex(r => r.before === parseInt(splitRule[0]))

  if (foundRuleIndex > -1) {
    orderingRules[foundRuleIndex] = {
      ...orderingRules[foundRuleIndex],
      after: [...orderingRules[foundRuleIndex].after, parseInt(splitRule[1])],
    }
  } else {
    orderingRules.push({ before: parseInt(splitRule[0]), after: [parseInt(splitRule[1])] })
  }
})
const pages = input[1].split("\n").map(pages => pages.split(",").map(page => parseInt(page)))

function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) == JSON.stringify(arr2)
}

function sortFn(x, y) {
  const foundOrder = orderingRules.find(rule => rule.before === x)
  if (foundOrder) {
    if (foundOrder.after.includes(y)) {
      return -1
    } else {
      return 1
    }
  }
  return 0
}

function calculateMiddleNumTotal() {
  let correctTotal = 0
  let incorrectTotal = 0
  let correctPages = []
  let incorrectPages = []
  let sortedPages = pages.map(page => [...page].sort(sortFn))

  for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
    if (arraysEqual(pages[pageIdx], sortedPages[pageIdx])) {
      correctPages.push(sortedPages[pageIdx])
    } else {
      incorrectPages.push(sortedPages[pageIdx])
    }
  }

  for (let page of correctPages) {
    const middleNum = page[Math.floor((page.length - 1) / 2)]

    correctTotal += middleNum
  }
  for (let page of incorrectPages) {
    const middleNum = page[Math.floor((page.length - 1) / 2)]

    incorrectTotal += middleNum
  }

  return { correct: correctTotal, incorrect: incorrectTotal }
}

const totals = calculateMiddleNumTotal()

console.log(`Solution 1: ${totals.correct}`)
console.log(`Solution 2: ${totals.incorrect}`)
