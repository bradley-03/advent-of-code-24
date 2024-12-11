const fs = require("fs")
const input = fs.readFileSync("./inputs/5.txt", "utf8").trim().split("\n\n")

const orderingRules = input[0].split("\n").map(rule => {
  const splitRule = rule.split("|")
  return { before: parseInt(splitRule[0]), after: parseInt(splitRule[1]) }
})
const unorderedPages = input[1].split("\n").map(pages => pages.split(",").map(page => parseInt(page)))

function sortFn(x, y) {}

console.log(unorderedPages)
