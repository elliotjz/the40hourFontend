import React, { useCallback, useState, useEffect } from "react";
import { comparePlayerScores } from "../helpers";

const BASE_URL =
  "https://the40hourbackend.herokuapp.com" || "http://localhost:5000";

export const AppContext = React.createContext();

const useAppData = () => {
  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartDomainIndex, setChartDomainIndex] = useState(2);
  const [excludedPeople, setExcludedPeople] = useState([]);
  const [donorAmounts, setDonorAmounts] = useState([]);

  const fetchDonationData = async () => {
    setIsLoading(true);

    const res = await fetch(`${BASE_URL}/api/data`);
    const data = await res.json();
    setDonationData(data);
    setIsLoading(false);
  };

  const scrapeDonationPages = async () => {
    fetch(`${BASE_URL}/api/scrape`, { method: "POST" });
  };

  const changeDomain = (index) => {
    setChartDomainIndex(index);
  };

  /**
   * Fetch donation data on app load
   */
  useEffect(() => {
    fetchDonationData();
  }, []);

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
    setExcludedPeople((exclPeople) => {
      const wasExcluded = exclPeople.includes(name);
      return wasExcluded
        ? exclPeople.filter((excludedPlayer) => excludedPlayer !== name)
        : [...exclPeople, name];
    });
  });

  return {
    changeDomain,
    chartDomainIndex,
    donationData,
    donorAmounts,
    excludedPeople,
    fetchDonationData,
    isLoading,
    onChipClick,
    scrapeDonationPages,
  };
};

export const AppContextProvider = ({ children }) => {
  const hookInfo = useAppData();

  return <AppContext.Provider value={hookInfo}>{children}</AppContext.Provider>;
};
