const calculateTime = (createdAt: string) => {
  const createdAtDate = new Date(createdAt).getTime();
  const currentDate = new Date().getTime();
  const differenceMilliseconds = currentDate - createdAtDate;

  const differenceDays = Math.floor(
    differenceMilliseconds / (1000 * 60 * 60 * 24),
  );

  if (differenceDays > 0) {
    return `${differenceDays}일`;
  }

  const differenceInHours = Math.floor(
    differenceMilliseconds / (1000 * 60 * 60),
  );

  if (differenceInHours > 0) {
    return `${differenceInHours}시간`;
  }

  const differenceInMinutes = Math.floor(differenceMilliseconds / (1000 * 60));

  if (differenceInMinutes > 0) {
    return `${differenceInMinutes}분`;
  }

  const differenceInSeconds = Math.floor(differenceMilliseconds / 1000);

  return `${differenceInSeconds}초`;
};

export default calculateTime;
