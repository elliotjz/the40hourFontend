import { usePage } from "../hooks/usePage";
import Actions from "./Actions";
import Header from "./Header";
import Footer from "./Footer";
import DonationChart from "./DonationChart";
import DomainControl from "./DomainControl";
import LoadingIndicator from "./LoadingIndicator";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Page = () => {
  const { chartOptions, parsedDonations } = usePage();
  const { isLoading } = useContext(AppContext);
  return (
    <div className="page">
      <Header />
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
