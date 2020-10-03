import DonationDataContext from "../contexts/DonationDataContext";
import Data from "../components/Data";

export default function Home() {
  return (
    <DonationDataContext>
      <Data />
    </DonationDataContext>
  );
}
