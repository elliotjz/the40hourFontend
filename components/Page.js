import { useEffect, useState } from 'react'
import { DonationDataProvider } from '../contexts/DonationDataContext'

const BASE_URL = 'https://the40hourbackend.herokuapp.com' || 'http://localhost:5000';

function useDonationData() {
  const [donationData, setDonationData] = useState({})

  const fetchDonationData = async () => {
    setDonationData({
      ...donationData,
      loading: true
    });
    const res = await fetch(`${BASE_URL}/api/data`);
    const data = await res.json();
    setDonationData({ loading: false, donationHistory: data });
  }

  const scrapeDonationPages = async () => {
    fetch(`${BASE_URL}/api/scrape`, { method: 'POST' });
  }

  useEffect(() => {
    fetchDonationData();
  }, [])

  return { donationData, fetchDonationData, scrapeDonationPages };
}

export default function Page({ children }) {
  const hookInfo = useDonationData();

  return (
    <DonationDataProvider value={hookInfo}>
      <div className="page">{children}</div>
    </DonationDataProvider>
  )
}
