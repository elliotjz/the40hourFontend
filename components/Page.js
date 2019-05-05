import { useEffect, useState } from 'react'
import { ScrapeProvider } from './ScrapeContext'

// Custom Hook
function useScrapes() {
  // Initial State inside hook
  const [scrapes, setScrapes] = useState({})

  // Fetch Function
  async function fetchScrapes() {
    console.log("fetching...");
    const url = 'https://the40hourbackend.herokuapp.com/api/data'
    console.log(`api URL: ${url}`);
    const res = await fetch(url)
    const data = await res.json()
    console.log("done");
    setScrapes(data)
  }

  // Did Mount / did Update
  useEffect(() => {
    fetchScrapes()
  }, [])
  return { scrapes, fetchScrapes }
}

export default function Page({ children }) {
  const hookInfo = useScrapes()
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  )
}
