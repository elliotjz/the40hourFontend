import { AppContextProvider } from "../contexts/AppContext";
import Page from "../components/Page";

export default function Home() {
  return (
    <AppContextProvider>
      <Page />
    </AppContextProvider>
  );
}
