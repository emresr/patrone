const months: Array<string> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function stampToDate(date: string) {
  const month = parseInt(date.substr(5, 2));
  const day = date.substr(8, 2);

  return months[month - 1] + ' ' + day;
}
