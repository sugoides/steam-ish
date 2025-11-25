// src/utils/format.js
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const minutesToHours = (mins) => (mins / 60).toFixed(1);
const since = (unix) => {
  const d = dayjs.unix(unix);
  return { exact: d.format('YYYY-MM-DD'), relative: d.fromNow() };
};

module.exports = { minutesToHours, since };
