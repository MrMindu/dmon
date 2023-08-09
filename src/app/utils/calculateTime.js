export const calculateTime = (sign, timestamp, ms) => {
  if (sign === `+`) {
    return timestamp + ms;
  }

  return timestamp - ms;
};
