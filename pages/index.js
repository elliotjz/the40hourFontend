import { DonationDataProvider } from "../contexts/DonationDataContext";
import Page from "../components/Page";

export default function Home() {
  return (
    <DonationDataProvider>
      <Page />
    </DonationDataProvider>
  );
}
