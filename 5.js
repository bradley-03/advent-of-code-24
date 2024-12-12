const fs = require("fs")
const input = fs.readFileSync("./inputs/5.txt", "utf8").trim().split("\n\n")

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

// function sortFn(x, y) {
//   const foundOrder = orderingRules.find(rule => rule.before === x)
//   if (foundOrder) {
//     if (foundOrder.after.includes(y)) {
//       return -1
//     } else {
//       return 1
//     }
//   }
//   return 0
// }
function shouldSwapNumbers(currentNum, compareAgainst) {
  const foundOrder = orderingRules.find(rule => rule.before === currentNum)

  if (foundOrder) {
    if (foundOrder.after.includes(compareAgainst)) {
      return true
    }
    return false
  }
  return false
}

function calculateMiddleNumTotal() {
  let total = 0
  for (let page = 0; page < pages.length; page++) {
    for (let num = 0; num < pages[page].length; num++) {
      for (let compareNum = num + 1; compareNum < pages[page].length - 1; compareNum++) {
        if (shouldSwapNumbers(pages[page][num], pages[page][compareNum])) {
          const tempNum = pages[page][num]
          pages[page][num] = pages[page][compareNum]
          pages[page][compareNum] = tempNum
          break
        }
      }
      break
    }
  }

  console.log(pages)
  // for (let page of orderedPages) {
  //   const middleNum = page[Math.floor((page.length - 1) / 2)]

  //   total += middleNum
  // }
  // return total
}

console.log(`Solution 1: ${calculateMiddleNumTotal()}`)
