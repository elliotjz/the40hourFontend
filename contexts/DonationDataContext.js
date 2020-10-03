import React, { useState, useEffect } from "react";

const BASE_URL =
  "https://the40hourbackend.herokuapp.com" || "http://localhost:5000";

export const DonationDataContext = React.createContext();

export const useDonationData = () => {
  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchDonationData();
  }, []);

  return { donationData, isLoading, fetchDonationData, scrapeDonationPages };
};

export const DonationDataProvider = ({ children }) => {
  const hookInfo = useDonationData();

  return (
    <DonationDataContext.Provider value={hookInfo}>
      {children}
    </DonationDataContext.Provider>
  );
};
