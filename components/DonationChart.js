import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Chart } from 'react-google-charts'
import { distanceInWordsStrict } from 'date-fns'
import Typography from '@material-ui/core/Typography'
import { Button, CircularProgress } from '@material-ui/core'
import { Line } from 'rc-progress';

import { colors, comparePlayerScores } from '../helpers'
import Chips from './Chips'

const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
  },
  chartLoader: {
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  h6: {
    marginBottom: '20px',
    color: '#777',
  },
  progress: {
    maxWidth: '500px',
    margin: '0 auto 50px auto',
  },
  loader: {
    margin: 'auto',
  },
  domainButtonContainer: {
    color: theme.palette.primary.dark,
  },
})

const chartOptions = {
  curveType: 'none',
  legend: 'none',
  colors,
  chartArea: { width: '85%', height: '70%' },
}

// 6 hours, 3 hours, 1 hours, 15 minutes, 1 minute
const chartDomains = [
  { text: '2 Weeks', samplesInDomain: 56, interval: 1000 * 60 * 60 * 6 },
  { text: '1 week', samplesInDomain: 56, interval: 1000 * 60 * 60 * 3 },
  { text: '3 days', samplesInDomain: 72, interval: 1000 * 60 * 60 },
  { text: '1 day', samplesInDomain: 96, interval: 1000 * 60 * 15 },
  { text: '1 hour', samplesInDomain: 60, interval: 1000 * 60 * 1 },
]

class DonationChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartDomainIndex: 2,
      excludedPeople: null,
    }
  }

  getMostRecentAmounts(donationData, names) {
    const donorAmounts = names.map(name => {
      let person
      let i = donationData.length - 1
      while (!person && i > 0) {
        person = donationData[i].people.find(el => el.name === name)
        i--
      }
      return [name, person.amount, person.target]
    })
    let sorted = donorAmounts.sort(comparePlayerScores)
    return sorted
  }

  onChipClick = name => {
    // If excluded people has been set in state, use that
    // Otherwise, use the props to calculate it
    const { excludedPeople: exclState } = this.state
    let excludedPeople
    if (exclState) {
      excludedPeople = exclState
    } else {
      const { donationData, names } = this.props
      const donorAmounts =  this.getMostRecentAmounts(donationData, names)
      excludedPeople = donorAmounts.slice(10).map(player => player[0])
    }

    // Add or remove the name that was clicked
    if (excludedPeople.includes(name)) {
      const index = excludedPeople.indexOf(name)
      excludedPeople.splice(index, 1)
    } else {
      excludedPeople.push(name)
    }
    this.setState({
      excludedPeople,
    })
  }

  getCurrentAmount(name, donationData, raceCounter) {
    let currentScore
    let i = raceCounter
    while (currentScore === undefined && i >= 0) {
      const donorInfo = donationData[i].people.find(el => el.name == name)
      if (donorInfo) {
        currentScore = donorInfo.amount
      }
      i -= 1
    }
    return currentScore
  }

  changeDomain = index => {
    this.setState({
      chartDomainIndex: index,
    })
  }

  parseDonations(donationData, donorAmounts, excludedPeople) {
    // Get the domain index
    const { chartDomainIndex } = this.state

    const parsedColors = colors.slice()
    const colorsToRemove = []

    if (donationData && donationData.length !== 0) {
      const parsedData = [['Date']]

      // Add the names of the people
      const people = []
      donorAmounts.forEach((donor, i) => {
        const name = donor[0]
        // exclude excluded players
        if (!excludedPeople.includes(name)) {
          // Append Name
          people.push(donor[0])
        } else {
          colorsToRemove.push(i)
        }
      })
      parsedData[0].push(...people)

      // Get the interval for the chart
      const currentTime = new Date()
      const { interval, samplesInDomain } = chartDomains[chartDomainIndex]
      const startTimestamp = currentTime - interval * samplesInDomain

      // Add a row for each interval
      let scrapeIterator = 0
      let scrape
      let prevScrape
      for (let timestamp = startTimestamp; timestamp <= currentTime; timestamp += interval) {
        const xLabel = distanceInWordsStrict(new Date(timestamp), currentTime) + " ago"

        // Find a scrape for this timestamp
        scrape = donationData[scrapeIterator]
        while (scrape.date < timestamp && scrapeIterator < donationData.length - 1) {
          scrapeIterator += 1
          prevScrape = scrape
          scrape = donationData[scrapeIterator]
        }
        if (scrape.date > timestamp + interval) {
          // Scrape is too new
          if (parsedData.length === 1) {
            // No data added yet
            if (!prevScrape) {
              // Records don't go back this far, so push an undefined row
              parsedData.push([xLabel, ...people.map(el => undefined)])
            } else {
              // Use the previous scrape as a starting point
              const amounts = people.map((name, i) => {
                const person = prevScrape.people.find(el => el.name === name)
                if (person) return person.amount
                const lastValue = parsedData[parsedData.length - 1][i + 1]
                return (typeof lastValue === "string") ? undefined : lastValue
              })

              parsedData.push([xLabel, ...amounts])
            }
          } else {
            // Append the data from the previous interval
            const prevRow = parsedData[parsedData.length - 1]
            parsedData.push([xLabel, ...prevRow.slice(1)])
          }
        } else {
          // Get each person's amount from scrape
          const amounts = people.map((name, i) => {
            const person = scrape.people.find(el => el.name === name)
            if (person) return person.amount
            const lastValue = parsedData[parsedData.length - 1][i + 1]
            return (typeof lastValue === "string") ? undefined : lastValue
          })

          parsedData.push([xLabel, ...amounts])
        }
      }

      for (let i = colorsToRemove.length - 1; i >= 0; i--) {
        parsedColors.splice(colorsToRemove[i], 1)
      }
      return [parsedData, parsedColors]
    }
  }

  render() {
    const { classes, donationData, names } = this.props
    const { chartDomainIndex } = this.state

    const donorAmounts =  this.getMostRecentAmounts(donationData, names)
    const excludedPeople = this.state.excludedPeople ?
      this.state.excludedPeople :
      donorAmounts.slice(10).map(player => player[0])

    const { heroAmount } = donationData[donationData.length - 1]
    const heroTarget = 40000

    const fbAmount = donorAmounts.reduce((acc, donor) => acc + donor[1], 0)
    const fbTarget = donorAmounts.reduce((acc, donor) => acc + donor[2], 0)

    const totalAmount = heroAmount + fbAmount
    const totalTarget = heroTarget + fbTarget
    
    const percentageOfTarget = totalAmount / totalTarget * 100

    const haFormated = new Intl.NumberFormat().format(heroAmount)
    const htFormated = new Intl.NumberFormat().format(heroTarget)
    const fbaFormated = new Intl.NumberFormat().format(fbAmount)
    const fbtFormated = new Intl.NumberFormat().format(fbTarget)
    const taFormated = new Intl.NumberFormat().format(totalAmount)
    const ttFormated = new Intl.NumberFormat().format(totalTarget)

    const parsedDonations = this.parseDonations(donationData, donorAmounts, excludedPeople)

    let parsedData
    let parsedColors
    if (parsedDonations) {
      parsedData = parsedDonations[0]
      parsedColors = parsedDonations[1]
    }
    chartOptions.colors = parsedColors
    console.log(parsedData);

    return (
      <div className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          The 40 Hour Jammin' Donation Tally
        </Typography>
        <Typography variant="h6" className={classes.h6}>
          Facebook Donated: ${fbaFormated} 💰 Target: ${fbtFormated}
        </Typography>
        <Typography variant="h6" className={classes.h6}>
          Everyday Hero Donated: ${haFormated} 💰 Target: ${htFormated}
        </Typography>
        <Typography variant="h5" className={classes.title}>
          Total Donated: ${taFormated} 💰 Target: ${ttFormated}
        </Typography>
        <div className={classes.progress}>
        <Typography variant="body1">Progress {percentageOfTarget.toString().substr(0, 4)}%</Typography>
          <Line percent={percentageOfTarget} strokeWidth="2" strokeColor="#3f51b5" trailColor="#a1aae0" />
        </div>
        <Typography variant="h6">Thanks to everyone who has donated so far, big or small. ❤️</Typography>
        {parsedData !== undefined && parsedData.length > 1 ? (
          <div className={classes.root}>
            <Chips
              donorAmounts={donorAmounts}
              colors={colors}
              onClick={this.onChipClick}
              excludedPeople={excludedPeople}
            />
            {parsedData[0].length > 1 && (
              <div>
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="600px"
                  data={parsedData}
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
                  variant={chartDomainIndex === index ? 'outlined' : 'text'}
                  onClick={() => this.changeDomain(index)}
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
    )
  }
}

DonationChart.propTypes = {
  donationData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DonationChart)
