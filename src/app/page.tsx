import HomeClient from "./home-client";
import { getMarketData } from "@/lib/market";

export default async function HomePage() {
  const marketData = await getMarketData();

  return <HomeClient marketData={marketData} />;
}
