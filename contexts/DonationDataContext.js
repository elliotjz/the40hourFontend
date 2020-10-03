import React, { useState, useEffect } from "react";

const BASE_URL =
  "https://the40hourbackend.herokuapp.com" || "http://localhost:5000";

export const DonationDataContext = React.createContext();

const useDonationData = () => {
  const [donationData, setDonationData] = useState({});

  const fetchDonationData = async () => {
    setDonationData({
      ...donationData,
      loading: true,
    });

    const res = await fetch(`${BASE_URL}/api/data`);
    const data = await res.json();
    setDonationData({ loading: false, donationHistory: data });
  };

  const scrapeDonationPages = async () => {
    fetch(`${BASE_URL}/api/scrape`, { method: "POST" });
  };

  useEffect(() => {
    fetchDonationData();
  }, []);

  return { donationData, fetchDonationData, scrapeDonationPages };
};

export default ({ children }) => {
  const hookInfo = useDonationData();

  return (
    <DonationDataContext.Provider value={hookInfo}>
      {children}
    </DonationDataContext.Provider>
  );
};
