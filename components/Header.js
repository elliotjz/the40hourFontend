import React from "react";
import { Line } from "rc-progress";

import LoadingIndicator from "./LoadingIndicator";

const Header = (props) => {
  const { isLoading, totalAmount, totalTarget, percentageOfTarget } = props;

  return (
    <div className="header">
      <h1 className="heading">The 40 Hour Jammin' Donation Tally</h1>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <p className="totals">
            Total Donated: ${totalAmount} 💰 Target: ${totalTarget}
          </p>
          <div className="progress">
            <p className="progress-text">
              {percentageOfTarget.toString().substr(0, 4)}% of target reached
            </p>
            <div className="progress-bar-wrapper">
              <Line
                percent={percentageOfTarget}
                strokeWidth="1.5"
                trailWidth="1.5"
                strokeColor="var(--progress-bar-color)"
                trailColor="var(--progress-bar-secondary-color)"
              />
            </div>
          </div>
        </>
      )}
      <p>Thanks to everyone who has donated so far, big or small. ❤️</p>
    </div>
  );
};

export default Header;
