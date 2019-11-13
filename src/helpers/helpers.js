export const formatedTime = (time) => {
  if (time === 0) {
    return `00`;
  } else if (time < 10) {
    return `0${time}`;
  }
  return time;
};
