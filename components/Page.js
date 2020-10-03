import { usePage } from "../hooks/usePage";
import Actions from "./Actions";
import Header from "./Header";
import Footer from "./Footer";
import DonationChart from "./DonationChart";
import DomainControl from "./DomainControl";
import LoadingIndicator from "./LoadingIndicator";

const Page = () => {
  const {
    changeDomain,
    chartDomainIndex,
    chartOptions,
    donorAmounts,
    excludedPeople,
    isLoading,
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
        isLoading={isLoading}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <DonationChart
            chartOptions={chartOptions}
            donorAmounts={donorAmounts}
            excludedPeople={excludedPeople}
            onChipClick={onChipClick}
            parsedDonations={parsedDonations}
          />
          <DomainControl
            changeDomain={changeDomain}
            chartDomainIndex={chartDomainIndex}
          />
        </>
      )}
      <Actions />
      <Footer />
    </div>
  );
};

export default Page;
