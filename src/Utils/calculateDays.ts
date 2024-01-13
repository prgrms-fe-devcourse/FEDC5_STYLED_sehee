const calculateDays = (createdAt: string) => {
  const createdAtDate = new Date(createdAt).getTime();
  const currentDate = new Date().getTime();
  const differenceMilliseconds = currentDate - createdAtDate;
  const differenceDays = Math.floor(
    differenceMilliseconds / (1000 * 60 * 60 * 24),
  );

  // 0일 이라면 시간 단위로 변환
  if (differenceDays === 0) {
    const differenceInHours = Math.floor(
      differenceMilliseconds / (1000 * 60 * 60),
    );

    return `${differenceInHours}시간`;
  }

  return `${differenceDays}일`;
};

export default calculateDays;
