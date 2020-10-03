import { DonationDataProvider } from "../contexts/DonationDataContext";
import Data from "../components/Data";

export default function Home() {
  return (
    <DonationDataProvider>
      <Data />
    </DonationDataProvider>
  );
}
