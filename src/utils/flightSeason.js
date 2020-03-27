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

export default class FlightSeason {
  /**
   * @class FlightSeason
   *
   * @param {string} seasonStr - The falter's flight season as found in the .md files
   */
  constructor(seasonStr) {
    /**
     * An array with the flight seasons of the falter
     * @type {Array.<number[]>}
     * @public
     */
    this.seasons = seasonStr ? seasonStr.split(',').map(r => convertRange(r)) : [range(0, 35)];
  }

  /**
   * Get the generation for a specific month section
   * @param {number} month - The month represented as a number
   * @param {number} [section=0] - The section of the given month - 0: start, 1: mid, 2: end
   * @return {number} The generation - 0 means "not in season"
   */
  getGen(month, section = 0) {
    const monthVal = month * 3 + section;
    for (let i = 0; i < this.seasons.length; i += 1) {
      if (this.seasons[i].includes(monthVal)) {
        return i + 1;
      }
    }
    return 0;
  }

  /**
   * Checks if the Falter is in season
   * @param {Date} [date] - If not specified, the current date will be used
   * @return {boolean}
   */
  inSeason(date = new Date()) {
    let section = 0;
    if (date.getDate() >= 20) section = 2;
    else if (date.getDate() >= 10) section = 1;
    const monthVal = date.getMonth() * 3 + section;
    return this.seasons.flat().includes(monthVal);
  }
}
