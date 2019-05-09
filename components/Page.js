import { useEffect, useState } from 'react'
import { ScrapeProvider } from './ScrapeContext'

// Custom Hook
function useScrapes() {
  // Initial State inside hook
  const [data, setScrapes] = useState({})

  // Fetch Function
  async function fetchScrapes() {
    setScrapes({ ...data, loading: true })
    console.log("fetching...");
    const url = 'https://the40hourbackend.herokuapp.com/api/data' || 'http://localhost:5000/api/data'
    console.log(`api URL: ${url}`);
    const res = await fetch(url)
    const scrapes = await res.json()
    console.log("done");
    setScrapes({ loading: false, scrapes })
  }

  // Did Mount / did Update
  useEffect(() => {
    fetchScrapes()
  }, [])
  return { data, fetchScrapes }
}

export default function Page({ children }) {
  const hookInfo = useScrapes()
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  )
}
