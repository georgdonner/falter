import React from 'react';

import FlightSeason from '../../utils/flightSeason';
import './index.scss';

export default ({ season: seasonStr }) => {
  const season = new FlightSeason(seasonStr);

  const monthScala = [...new Array(12)].map((_, i) => {
    const monthLabel = new Intl.DateTimeFormat('de-DE', { month: 'short' }).format(new Date(2020, i));
    return (
      <div key={monthLabel}>
        <div className="month">
          <div className={`gen-${season.getGen(i)}`} />
          <div className={`gen-${season.getGen(i, 1)}`} />
          <div className={`gen-${season.getGen(i, 2)}`} />
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
