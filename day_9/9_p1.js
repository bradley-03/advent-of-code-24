const fs = require("fs")
const input = fs
  .readFileSync("./inputs/9.txt", "utf8")
  .trim()
  .split("")
  .map(num => parseInt(num))

let disk = []

let isFreeSpace = false
for (let i = 0; i < input.length; i++) {
  if (isFreeSpace === false) {
    for (let j = 0; j < input[i]; j++) {
      disk.push(i / 2)
    }
    isFreeSpace = true
  } else {
    for (let j = 0; j < input[i]; j++) {
      disk.push(".")
    }
    isFreeSpace = false
  }
}

for (let i = disk.length - 1; i > 0; i--) {
  if (disk[i] !== ".") {
    const freeSpaceIdx = disk.findIndex(el => el === ".")
    if (freeSpaceIdx > -1 && freeSpaceIdx < i) {
      disk[freeSpaceIdx] = disk[i]
      disk[i] = "."
    } else {
      break
    }
  }
}

let total = 0
for (let i = 0; i < disk.length; i++) {
  if (disk[i] !== ".") {
    const num = disk[i]
    total += i * num
  }
}

console.log(total)
