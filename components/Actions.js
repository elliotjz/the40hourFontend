import React from "react";

import { useDonationData } from "../contexts/DonationDataContext";

const Actions = () => {
  const {
    fetchDonationData,
    scrapeDonationPages,
    donationData,
  } = useDonationData();
  const { loading } = donationData;

  return (
    <div className="actions">
      <button onClick={fetchDonationData} disabled={loading}>
        {loading ? "Refreshing Data..." : "Refresh Data"}
      </button>
      <button onClick={scrapeDonationPages} disabled={loading}>
        Scrape
      </button>
    </div>
  );
};

export default Actions;
