export const getWinnerNo = (winners) => {
  const winners_length = Object.values(winners).length;
  if (winners_length === 0) return "First";
  if (winners_length === 1) return "Second";
  if (winners_length === 2) return "Third";
  if (winners_length === 3) return "Fourth";
  return "";
};
