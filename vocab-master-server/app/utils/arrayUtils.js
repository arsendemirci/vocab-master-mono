module.exports = {
  shuffle: (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  },
  sum: (array, prop) => {
    const sum = array.reduce((accumulator, object) => {
      return accumulator + object[prop];
    }, 0);
    return sum;
  },
};
