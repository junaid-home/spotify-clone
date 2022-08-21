const getRandomObjectsFromArray = (array, count) => {
  const randoms = []

  for (let i = 0; i < count; i += 1) {
    const x = array[Math.floor(Math.random() * array.length)]
    randoms.push(x)
  }

  return randoms
}

module.exports = getRandomObjectsFromArray
