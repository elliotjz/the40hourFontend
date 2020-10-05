import { usePage } from "../hooks/usePage";
import Actions from "./Actions";
import Header from "./Header";
import Footer from "./Footer";
import DonationChart from "./DonationChart";
import DomainControl from "./DomainControl";
import LoadingIndicator from "./LoadingIndicator";

const Page = () => {
  const {
    chartOptions,
    isLoading,
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
        <div className="chart-spinner-container">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <DonationChart
            chartOptions={chartOptions}
            parsedDonations={parsedDonations}
          />
          <DomainControl />
        </>
      )}
      <Actions />
      <Footer />
    </div>
  );
};

export default Page;
