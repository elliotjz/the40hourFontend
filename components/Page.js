import { usePage } from "../hooks/usePage";
import Actions from "./Actions";
import Header from "./Header";
import Footer from "./Footer";
import DonationChart from "./DonationChart";

const Page = () => {
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
    <div className="page">
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
      <Actions />
      <Footer />
    </div>
  );
};

export default Page;
