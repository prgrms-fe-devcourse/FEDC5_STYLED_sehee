import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const location = 'Asia/Seoul';

export const convertUtcToKstTime = (utcString: string) => {
  return dayjs.utc(utcString).tz(location).format('HH:mm');
};

export const convertUtcToKstDate = (utcString: string) => {
  return dayjs.utc(utcString).tz(location).format('YYYY-MM-DD');
};

export const calculateDate = (utcString: string) => {
  const currentDate = dayjs();
  const prevDate = dayjs.utc(utcString);

  // 현재 날짜와 ISO UTC 날짜의 차이 계산
  const diffInYears = currentDate.diff(prevDate, 'year');
  const diffInMonths = currentDate.diff(prevDate, 'month');
  const diffInWeeks = currentDate.diff(prevDate, 'week');
  const diffInDays = currentDate.diff(prevDate, 'day');
  const diffInHours = currentDate.diff(prevDate, 'hour');
  const diffInMinutes = currentDate.diff(prevDate, 'minute');
  const diffInSeconds = currentDate.diff(prevDate, 'second');

  if (diffInYears !== 0) {
    return `${diffInYears}년 전`;
  }
  if (diffInMonths !== 0) {
    return `${diffInMonths}달 전`;
  }
  if (diffInWeeks !== 0) {
    return `${diffInWeeks}주 전`;
  }
  if (diffInDays !== 0) {
    return `${diffInDays}일 전`;
  }
  if (diffInHours !== 0) {
    return `${diffInHours}시간 전`;
  }
  if (diffInMinutes !== 0) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInSeconds !== 0) {
    return `${diffInSeconds}초 전`;
  }

  return '방금';
};
