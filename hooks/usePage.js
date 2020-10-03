import { useCallback, useContext, useEffect, useState } from "react";
import { distanceInWordsStrict } from "date-fns";

import { AppContext } from "../contexts/AppContext";
import { colors, chartDomains, comparePlayerScores } from "../helpers";

export const usePage = (props) => {
  const { chartDomainIndex, donationData, isLoading } = useContext(AppContext);

  const [excludedPeople, setExcludedPeople] = useState([]);
  const [donorAmounts, setDonorAmounts] = useState([]);
  const [parsedDonations, setParsedDonations] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    curveType: "none",
    legend: "none",
    colors,
    chartArea: { width: "85%", height: "70%" },
  });

  /**
   * Update donor amounts array
   */
  useEffect(() => {
    if (!donationData || !donationData.length) {
      return;
    }

    const latestDonationData =
      donationData[donationData.length - 1].donationData;
    const donorAmounts = latestDonationData.map((person) => {
      return [person.name, person.amount, person.target];
    });
    const sorted = donorAmounts.sort(comparePlayerScores);
    setDonorAmounts(sorted);
    setExcludedPeople(sorted.slice(10).map((player) => player[0]));
  }, [donationData]);

  const onChipClick = useCallback((name) => {
    // If excluded people has been set in state, use that
    // Otherwise, use the props to calculate it
    setExcludedPeople((oldExclPeople) => {
      const newExclPeople = [...oldExclPeople];
      // Add or remove the name that was clicked
      if (newExclPeople.includes(name)) {
        const index = newExclPeople.indexOf(name);
        newExclPeople.splice(index, 1);
      } else {
        newExclPeople.push(name);
      }
      return newExclPeople;
    });
  });

  /**
   * Set parsed donations whenever the relevant data changes
   */
  useEffect(() => {
    const parsedColors = colors.slice();
    const colorsToRemove = [];

    if (!donationData || donationData.length === 0) {
      return;
    }

    const parsedData = [["Date"]];

    // Add the names of the people
    const people = donorAmounts
      .filter((person, i) => {
        // exclude excluded players
        const isExcluded = excludedPeople.includes(person[0]);
        if (isExcluded) {
          colorsToRemove.push(i);
        }

        return !isExcluded;
      })
      .map((person) => person[0]);
    parsedData[0].push(...people);

    // Get the interval for the chart
    const currentTime = new Date();
    const { interval, samplesInDomain } = chartDomains[chartDomainIndex];
    const startTimestamp = currentTime - interval * samplesInDomain;

    // Add a row for each interval
    let scrapeIterator = 0;
    let scrape;
    let prevScrape;
    for (
      let timestamp = startTimestamp;
      timestamp <= currentTime;
      timestamp += interval
    ) {
      const xLabel =
        distanceInWordsStrict(new Date(timestamp), currentTime) + " ago";

      // Find a scrape for this timestamp
      scrape = donationData[scrapeIterator];
      while (
        scrape.date < timestamp &&
        scrapeIterator < donationData.length - 1
      ) {
        scrapeIterator += 1;
        prevScrape = { ...scrape };
        scrape = { ...donationData[scrapeIterator] };
      }

      const isScrapeTooRecent = scrape.date > timestamp + interval;
      if (isScrapeTooRecent) {
        const isStart = parsedData.length === 1;
        if (isStart) {
          if (!prevScrape) {
            // Records don't go back this far, so push an undefined row
            parsedData.push([xLabel, ...people.map((el) => undefined)]);
          } else {
            // Use the previous scrape as a starting point
            const amounts = people.map((name, i) => {
              const person = prevScrape.donationData.find(
                (el) => el.name === name
              );
              if (person) return person.amount;
              const lastValue = parsedData[parsedData.length - 1][i + 1];
              return typeof lastValue === "string" ? undefined : lastValue;
            });

            parsedData.push([xLabel, ...amounts]);
          }
        } else {
          // Append the data from the previous interval
          const prevRow = parsedData[parsedData.length - 1];
          parsedData.push([xLabel, ...prevRow.slice(1)]);
        }
      } else {
        // Get each person's amount from scrape
        const amounts = people.map((name, i) => {
          const person = scrape.donationData.find((el) => el.name === name);
          if (person) return person.amount;

          // Person not found in scrape
          const lastValue = parsedData[parsedData.length - 1][i + 1];
          if (timestamp + interval > currentTime) {
            // this is the last iteration
            if (typeof lastValue === "string" || lastValue === undefined) {
              const currentAmount = donorAmounts.find(
                (el) => el[0] === name
              )[1];
              return currentAmount;
            }
          }
          return typeof lastValue === "string" ? undefined : lastValue;
        });

        parsedData.push([xLabel, ...amounts]);
      }
    }

    for (let i = colorsToRemove.length - 1; i >= 0; i--) {
      parsedColors.splice(colorsToRemove[i], 1);
    }
    setParsedDonations(parsedData);
    setChartOptions({
      ...chartOptions,
      colors: parsedColors,
    });
  }, [chartDomainIndex, donationData, donorAmounts, excludedPeople]);

  const amount = donorAmounts.reduce((acc, donor) => acc + donor[1], 0);
  const target = donorAmounts.reduce((acc, donor) => acc + donor[2], 0);
  const totalAmount = new Intl.NumberFormat().format(amount);
  const totalTarget = new Intl.NumberFormat().format(target);

  const percentageOfTarget = (amount / target) * 100;

  return {
    ...props,
    chartOptions,
    donorAmounts,
    excludedPeople,
    isLoading,
    onChipClick,
    parsedDonations,
    percentageOfTarget,
    totalAmount,
    totalTarget,
  };
};
