import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import Typography from "@material-ui/core/Typography";
import { Button, CircularProgress } from "@material-ui/core";
import { Line } from "rc-progress";

import { colors, chartDomains } from "../helpers";
import Chips from "./Chips";
import { useDonationChart } from "./customHooks/useDonationChart";

const styles = theme => ({
  container: {
    margin: "auto",
    textAlign: "center"
  },
  chartLoader: {
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    marginBottom: "20px"
  },
  h6: {
    marginBottom: "20px",
    color: "#777"
  },
  progress: {
    maxWidth: "500px",
    margin: "0 auto 50px auto"
  },
  loader: {
    margin: "auto"
  },
  domainButtonContainer: {
    color: theme.palette.primary.dark
  }
});

const DonationChart = withStyles(styles)((props) => {
  const {
    changeDomain,
    chartDomainIndex,
    chartOptions,
    classes,
    donorAmounts,
    excludedPeople,
    onChipClick,
    parsedDonations,
    percentageOfTarget,
    totalAmount,
    totalTarget
  } = useDonationChart(props);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        The 40 Hour Jammin' Donation Tally
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Total Donated: ${totalAmount} 💰 Target: ${totalTarget}
      </Typography>
      <div className={classes.progress}>
        <Typography variant="body1">
          Progress {percentageOfTarget.toString().substr(0, 4)}%
        </Typography>
        <Line
          percent={percentageOfTarget}
          strokeWidth="2"
          strokeColor="#3f51b5"
          trailColor="#a1aae0"
        />
      </div>
      <Typography variant="h6">
        Thanks to everyone who has donated so far, big or small. ❤️
      </Typography>
      {parsedDonations && parsedDonations.length > 1 ? (
        <div className={classes.root}>
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
                loader={
                  <div className={classes.chartLoader}>
                    <CircularProgress className={classes.loader} />
                  </div>
                }
              />
            </div>
          )}
          <div className={classes.domainButtonContainer}>
            {chartDomains.map((domain, index) => (
              <Button
                key={index}
                color="inherit"
                size="small"
                variant={chartDomainIndex === index ? "outlined" : "text"}
                onClick={() => changeDomain(index)}
              >
                {domain.text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="body1">
            Add a race result to see the tournament statistics.
          </Typography>
        </div>
      )}
    </div>
  );
});

DonationChart.propTypes = {
  donationHistory: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DonationChart);
