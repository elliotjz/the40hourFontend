import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

import { colors, chartDomains } from "../helpers";
import Chips from "./Chips";

const DonationChart = (props) => {
  const {
    changeDomain,
    chartOptions,
    donorAmounts,
    excludedPeople,
    onChipClick,
    parsedDonations,
  } = props;

  return (
    <div className="donation-chart">
      {parsedDonations && parsedDonations.length > 1 ? (
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
                height="600px"
                data={parsedDonations}
                options={chartOptions}
                loader={<div className="loading-container">Loading...</div>}
              />
            </div>
          )}
          <div className="domain-control">
            {chartDomains.map((domain, index) => (
              <button key={index} onClick={() => changeDomain(index)}>
                {domain.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>Add a race result to see the tournament statistics.</p>
        </div>
      )}
    </div>
  );
};

DonationChart.propTypes = {
  donationHistory: PropTypes.array.isRequired,
};

export default DonationChart;
