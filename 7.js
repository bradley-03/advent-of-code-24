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

console.log(eval(input[0].nums.join("*")))
