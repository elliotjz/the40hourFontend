import { usePage } from "../hooks/usePage";
import Header from "./Header";
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
      <footer className="footer">
        <p>
          <a href="https://www.the40hourjammin.com">The 40 hour jammin</a> is
          being held from May 17 until 19 on Magnetic Island, Queensland. To
          support the cause and move your favorite musician up the leaderboard,{" "}
          <a href="https://www.the40hourjammin.com/artists">donate</a>.
        </p>
        <p>
          The leaderboard gets the donation amounts from the facebook donation
          pages every 15 minutes, and will update more frequently once the 40
          hour jammin starts.
        </p>
        <p>
          This project is open source and was made by Elliot Zoerner. Find the
          source code{" "}
          <a href="https://github.com/elliotjz/the40hourFontend">here</a>.
        </p>
      </footer>
    </div>
  );
};

export default Page;
