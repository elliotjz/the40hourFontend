import React from "react";
import { Chart } from "react-google-charts";

import Chips from "./Chips";
import LoadingIndicator from "./LoadingIndicator";
import { useDonationChart } from "../hooks/useDonationChart";

const DonationChart = () => {
  const { chartOptions, parsedDonations } = useDonationChart();

  if (!parsedDonations || !parsedDonations[0]) {
    return null;
  }

  return (
    <div className="donation-chart">
      <div className="chips-wrapper">
        <Chips />
        <Chart
          chartType="LineChart"
          width="100%"
          height="var(--chart-height)"
          data={parsedDonations}
          options={chartOptions}
          loader={
            <div className="chart-spinner-container">
              <LoadingIndicator />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DonationChart;
