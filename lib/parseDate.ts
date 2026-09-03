import dayjs from 'lib/date/dayjs';

export default function parseDate(value: string | number) {
  const LOWER_LIMIT = 1e12; // 1 trillion, a common range for milliseconds
  const UPPER_LIMIT = 1e15; // 1 quadrillion, a common range for seconds
  const inputDate = Number(value);
  let dateResult;
  if (inputDate >= LOWER_LIMIT && inputDate <= UPPER_LIMIT) {
    // Assuming it's milliseconds
    dateResult = inputDate;
  } else {
    // Assuming it's in seconds, convert it to milliseconds
    dateResult = inputDate * 1000;
  }
  return dayjs(dateResult).utc().format('DD MMM YYYY ss:mm:hh');
}
