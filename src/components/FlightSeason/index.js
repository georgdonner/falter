import React from 'react';
import './index.scss';

const range = (start, end) => [...Array(end - start + 1).keys()].map((_, i) => i + start);

const convertMonthStr = (str) => {
  const [month, section] = str.split('.');
  return (Number(month) - 1) * 3 + Number(section);
};

const convertRange = (rangeStr) => {
  let [start, end] = rangeStr.split('-');
  start = start.includes('.') ? start : `${start}.0`;
  end = end.includes('.') ? end : `${end}.2`;
  return range(convertMonthStr(start), convertMonthStr(end));
};

export default ({ season }) => {
  const seasons = season ? season.split(',').map(r => convertRange(r)) : [range(0, 35)];
  const getGen = (monthVal) => {
    for (let i = 0; i < seasons.length; i += 1) {
      if (seasons[i].includes(monthVal)) {
        return i + 1;
      }
    }
    return 0;
  };

  const monthScala = [...new Array(12)].map((_, i) => {
    const monthLabel = new Intl.DateTimeFormat('de-DE', { month: 'short' }).format(new Date(2020, i));
    return (
      <div key={monthLabel}>
        <div className="month">
          <div className={`gen-${getGen(i * 3)}`} />
          <div className={`gen-${getGen(i * 3 + 1)}`} />
          <div className={`gen-${getGen(i * 3 + 2)}`} />
        </div>
        <div className="month-label">{monthLabel}</div>
      </div>
    );
  });

  return (
    <div id="flight-season">
      {monthScala}
    </div>
  );
};
