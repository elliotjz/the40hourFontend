/*
CONSTANTS
*/
export const colors = [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#DD4477",
  "#3B3EAC",
  "#0099C6",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
  "#22AA99",
  "#AAAA11",
  "#6633CC",
  "#5574A6",
  "#E67300",
  "#3B3EAC",
  "#8B0707",
  "#329262",
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#DD4477",
  "#3B3EAC",
  "#0099C6",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
  "#22AA99",
  "#AAAA11",
  "#6633CC",
  "#E67300",
  "#5574A6",
  "#8B0707",
  "#329262",
  "#3B3EAC",
];

// 6 hours, 3 hours, 1 hours, 15 minutes, 1 minute
export const chartDomains = [
  { text: "2 Weeks", samplesInDomain: 56, interval: 1000 * 60 * 60 * 6 },
  { text: "1 week", samplesInDomain: 56, interval: 1000 * 60 * 60 * 3 },
  { text: "3 days", samplesInDomain: 72, interval: 1000 * 60 * 60 },
  { text: "1 day", samplesInDomain: 96, interval: 1000 * 60 * 15 },
  { text: "1 hour", samplesInDomain: 60, interval: 1000 * 60 * 1 },
];

/*
FUNCTIONS
*/

export const comparePlayerScores = (a, b) => b[1] - a[1];
