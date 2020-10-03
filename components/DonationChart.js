import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

import { colors } from "../helpers";
import Chips from "./Chips";
import LoadingIndicator from "./LoadingIndicator";

const DonationChart = (props) => {
  const {
    chartOptions,
    donorAmounts,
    excludedPeople,
    onChipClick,
    parsedDonations,
  } = props;

  return (
    <div className="donation-chart">
      <div className="chips-wrapper">
        <Chips
          donorAmounts={donorAmounts}
          colors={colors}
          onClick={onChipClick}
          excludedPeople={excludedPeople}
        />
        {parsedDonations[0].length > 1 && (
          <div>
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
        )}
      </div>
    </div>
  );
};

DonationChart.propTypes = {
  donationHistory: PropTypes.array.isRequired,
};

export default DonationChart;
