export const repetationsOf = (item, array) => {
  if (!array) return;

  let count = 0;
  array.forEach((val) => {
    if (val === item) count++;
  });
  return count;
};

export const arrayFromRepetaions = (item, array) => {
  const repetations = repetationsOf(item, array);
  return [...Array(repetations)];
};
