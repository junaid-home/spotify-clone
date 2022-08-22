const getRandomObjectsFromArray = (array, count) => {
  const randoms = []

  while (randoms.length < count) {
    const x = array[Math.floor(Math.random() * array.length)]

    let unique = true
    randoms.forEach((y) => {
      if (y.id === x.id) {
        unique = false
      }
    })

    if (unique) {
      randoms.push(x)
    }
  }

  return randoms
}

module.exports = getRandomObjectsFromArray
