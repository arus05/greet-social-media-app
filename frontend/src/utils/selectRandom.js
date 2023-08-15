const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    const temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
}
const selectRandom = (arr, n = 3) => {
  if (arr.length <= n) return arr
  shuffle(arr)
  return arr.slice(0, n)
}

export default selectRandom

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// console.log(selectRandom(arr, 5))

  //const result = []
  // const selectedIndices = new Set()
  // const maxIndex = arr.length - 1

  // while (selectedIndices.size < n) {
  //   const randomIndex = Math.floor(Math.random() * (maxIndex + 1)) // returns 0 - maxIndex
  //   if (!selectedIndices.has(randomIndex)) {
  //     selectedIndices.add(randomIndex)
  //     result.push(arr[randomIndex])
  //   }
  // }
  // return result