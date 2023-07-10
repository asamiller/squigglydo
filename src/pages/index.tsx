// Use the dynamic import syntax to load the app component to avoid loading it on the server
import dynamic from "next/dynamic";
const App = dynamic(() => import("../components/App"), { ssr: false });

export default function Home() {
  return <App />;
}
