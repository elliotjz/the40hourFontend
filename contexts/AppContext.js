import React, { useState, useEffect } from "react";

const BASE_URL =
  "https://the40hourbackend.herokuapp.com" || "http://localhost:5000";

export const AppContext = React.createContext();

const useAppData = () => {
  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartDomainIndex, setChartDomainIndex] = useState(2);

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

  useEffect(() => {
    fetchDonationData();
  }, []);

  return {
    changeDomain,
    chartDomainIndex,
    donationData,
    isLoading,
    fetchDonationData,
    scrapeDonationPages,
  };
};

export const AppContextProvider = ({ children }) => {
  const hookInfo = useAppData();

  return <AppContext.Provider value={hookInfo}>{children}</AppContext.Provider>;
};
