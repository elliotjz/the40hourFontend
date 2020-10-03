import { usePage } from "../hooks/usePage";
import Header from "./Header";
import Footer from "./Footer";
import DonationChart from "./DonationChart";
import { useDonationData } from "../contexts/DonationDataContext";

const Page = () => {
  const {
    fetchDonationData,
    scrapeDonationPages,
    donationData,
  } = useDonationData();
  const { loading } = donationData;
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
  } = usePage();

  return (
    <div className="donation-data">
      <Header
        totalAmount={totalAmount}
        totalTarget={totalTarget}
        percentageOfTarget={percentageOfTarget}
      />
      <DonationChart
        changeDomain={changeDomain}
        chartOptions={chartOptions}
        donorAmounts={donorAmounts}
        excludedPeople={excludedPeople}
        onChipClick={onChipClick}
        parsedDonations={parsedDonations}
      />
      <button onClick={fetchDonationData} disabled={loading}>
        {loading ? "Refreshing Data..." : "Refresh Data"}
      </button>
      <button onClick={scrapeDonationPages} disabled={loading}>
        Scrape
      </button>
      <Footer />
    </div>
  );
};

export default Page;
