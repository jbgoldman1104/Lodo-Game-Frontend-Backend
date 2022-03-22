export const getNextTurn = (allTurns, availableTurns, turn) => {
  let i = allTurns.indexOf(turn);
  let newTurn;
  let idx = 0;
  while (newTurn === undefined) {
    if (availableTurns.includes(allTurns[i + idx + 1]))
      newTurn = allTurns[i + idx + 1];
    idx++;
    if (i + idx > 3) {
      i = 0;
      idx = -1;
    }
  }
  return newTurn;
};
