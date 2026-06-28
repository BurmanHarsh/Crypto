import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h";

export function useCoins() {
  return useQuery({
    queryKey: ["coins"],
    queryFn: async () => {
      const response = await axios.get(COINGECKO_URL);
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response from CoinGecko");
      }
      return response.data;
    },
    staleTime: 60000, // Cache data for 60 seconds
    refetchInterval: 60000, // Poll every 60 seconds to keep prices real-time
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
