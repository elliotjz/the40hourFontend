import React from "react";
import { Line } from "rc-progress";

const Header = (props) => {
  const { totalAmount, totalTarget, percentageOfTarget } = props;

  return (
    <div className="header">
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
    </div>
  );
};

export default Header;
