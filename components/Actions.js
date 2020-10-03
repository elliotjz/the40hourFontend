import React from "react";

import { useDonationData } from "../contexts/DonationDataContext";

const Actions = () => {
  const {
    fetchDonationData,
    isLoading,
    scrapeDonationPages,
  } = useDonationData();

  return (
    <div className="actions">
      <button
        className="action"
        onClick={fetchDonationData}
        disabled={isLoading}
      >
        {isLoading ? "Refreshing Data..." : "Refresh Data"}
      </button>
      <button
        className="action"
        onClick={scrapeDonationPages}
        disabled={isLoading}
      >
        Scrape
      </button>
    </div>
  );
};

export default Actions;
