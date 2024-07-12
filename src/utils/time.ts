const addZero = (time: number) => {
  return time < 10 ? "0" + time : time;
};

export const getFormattedTime = () => {
  const date = new Date();

  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};
