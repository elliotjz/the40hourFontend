import { useEffect, useState } from 'react'
import { DonationDataProvider } from './DonationDataContext'

function useDonationData() {
  const [donationData, setDonationData] = useState({})

  async function fetchDonationData() {
    setDonationData({
      ...donationData,
      loading: true
    })
    const url = 'http://localhost:5000/api/data'; // 'https://the40hourbackend.herokuapp.com/api/data' || 
    const res = await fetch(url)
    const data = await res.json()
    setDonationData({ loading: false, donationHistory: data });
  }

  const scrapeDonationPages = async () => {
    fetch('http://localhost:5000/api/scrape', { method: 'POST' });
  }

  useEffect(() => {
    fetchDonationData()
  }, [])

  return { donationData, fetchDonationData, scrapeDonationPages }
}

export default function Page({ children }) {
  const hookInfo = useDonationData()

  return (
    <DonationDataProvider value={hookInfo}>
      <div className="page">{children}</div>
    </DonationDataProvider>
  )
}
