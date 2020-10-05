import React, { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

const Actions = () => {
  const { fetchDonationData, isLoading, scrapeDonationPages } = useContext(
    AppContext
  );

  return (
    <div className="actions">
      <button
        className="action"
        onClick={fetchDonationData}
        disabled={isLoading}
      >
        {isLoading ? "Refreshing Data..." : "Refresh Data"}
      </button>
      {/* <button
        className="action"
        onClick={scrapeDonationPages}
        disabled={isLoading}
      >
        Scrape
      </button> */}
    </div>
  );
};

export default Actions;
