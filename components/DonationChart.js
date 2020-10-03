import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import { Line } from "rc-progress";

import { colors, chartDomains } from "../helpers";
import Chips from "./Chips";
import { useDonationChart } from "../hooks/useDonationChart";

const DonationChart = (props) => {
  const {
    changeDomain,
    chartOptions,
    donorAmounts,
    excludedPeople,
    onChipClick,
    parsedDonations,
    percentageOfTarget,
    totalAmount,
    totalTarget,
  } = useDonationChart(props);

  return (
    <div className="donation-chart">
      <h1>The 40 Hour Jammin' Donation Tally</h1>
      <p>
        Total Donated: ${totalAmount} 💰 Target: ${totalTarget}
      </p>
      <div className="progress-wrapper">
        <p>Progress {percentageOfTarget.toString().substr(0, 4)}%</p>
        <Line
          percent={percentageOfTarget}
          strokeWidth="2"
          strokeColor="#3f51b5"
          trailColor="#a1aae0"
        />
      </div>
      <p>Thanks to everyone who has donated so far, big or small. ❤️</p>
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
