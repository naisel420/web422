import "@/styles/bootstrap.min.css";
import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import RouteGuard from "@/components/RouteGuard";
import { Provider as JotaiProvider } from "jotai";

const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <JotaiProvider>
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </JotaiProvider>
    </SWRConfig>
  );
}
