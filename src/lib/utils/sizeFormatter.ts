export const sizeFormatter = (value: number) => {
  if (value <= 1_000) {
    return value + ' byte';
  } else if (value > 1_000 && value < 1_000_000) {
    return Math.floor(value / 1_000) + ' Kb';
  } else {
    return Math.floor(value / 1_000_000) + ' Mb';
  }
};

export default sizeFormatter;
