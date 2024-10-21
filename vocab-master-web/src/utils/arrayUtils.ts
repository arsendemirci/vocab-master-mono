export const shuffle = (array: []) => {
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
};

export const enumMap = (
  enumObj: any,
  nodeFunc: (
    value: [string, unknown],
    index: number,
    array: [string, unknown][]
  ) => any
) => {
  return Object.entries(enumObj)
    .filter(([key, value]) => isNaN(Number(key)))
    .map(nodeFunc);
};

export const sum = (array: [], prop: string) => {
  const sum = array.reduce((accumulator, object) => {
    return accumulator + object[prop];
  }, 0);
  return sum;
};

export default { shuffle, enumMap, sum };
