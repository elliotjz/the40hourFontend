import { useContext, useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link';

import { ScrapeContext } from './ScrapeContext'
import DonationChart from './DonationChart';

const styles = theme => ({
  container: {
    margin: '50px auto 0 auto',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#ccdfff',
    margin: '30px -10px -10px -10px',
    padding: '50px 0',
  },
  text: {
    margin: '50px auto',
    maxWidth: "800px",
  },
  fineprint: {
    margin: 'auto',
    maxWidth: "800px",
  },
  button: {
    margin: '30px auto 0 auto',
  },
})

const Data = ({ classes }) => {
  const { data, fetchScrapes } = useContext(ScrapeContext)
  const { scrapes, loading } = data

  const donationData = scrapes ? scrapes.donations : null
  const names = scrapes ? scrapes.names : null

  useInterval(() => {
   fetchScrapes()
  }, 30 * 1000)

  return (
    <div className={classes.container}>

      {donationData ?
        <DonationChart donationData={donationData} names={names} /> :
        <p>Loading...</p>
      }
      <Button
        color="primary"
        size="small"
        variant='contained'
        onClick={fetchScrapes}
        disabled={loading}
        className={classes.button}
      >
        {loading ? "Refreshing Data..." : "Refresh Data"}
      </Button>
      <footer className={classes.infoContainer}>
        <Typography variant='h5' className={classes.text}>
          <Link href="https://www.the40hourjammin.com">The 40 hour jammin</Link> is being held from May 17 until 19 on Magnetic Island, Queensland.
          To support the cause and move your favorite musician up the leaderboard, <Link href="https://www.the40hourjammin.com/artists">donate</Link>.
        </Typography>
        <Typography variant="body1" className={classes.fineprint}>
          The leaderboard gets the donation amounts from the facebook donation pages every 15 minutes,
          and will update more frequently once the 40 hour jammin starts.
        </Typography>
        <Typography variant="body1" className={classes.fineprint}>
          This project is open source and was made by Elliot Zoerner. Find the source code <Link href="https://github.com/elliotjz/the40hourFontend">here</Link>.
        </Typography>
      </footer>
    </div>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default withStyles(styles)(Data)
