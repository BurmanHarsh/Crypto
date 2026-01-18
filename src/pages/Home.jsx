import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [sentiment, setSentiment] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCoins(data);
          const bullish = data.filter((c) => c.price_change_percentage_24h > 0).length;
          const ratio = bullish / data.length;
          if (ratio > 0.6) setSentiment("Strongly Bullish 🚀");
          else if (ratio > 0.52) setSentiment("Bullish 📈");
          else if (ratio < 0.48) setSentiment("Bearish 📉");
          else setSentiment("Neutral ⚖️");
        }
        setLoading(false);
      })
      .catch(() => {
        setSentiment("Unable to load");
        setLoading(false);
      });
  }, []);

  const sortedByChange = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const gainers = sortedByChange.slice(0, 5);
  const losers = sortedByChange.slice(-5).reverse();

  const getSentimentColor = () => {
    if (sentiment.includes("Bullish")) return "text-success";
    if (sentiment.includes("Bearish")) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Crypto Market</span> Sentiment
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Real-time market analysis, top gainers and losers, powered by CoinGecko
        </p>
      </div>

      {/* Sentiment Card */}
      <div className="glass-card p-8 mb-8 text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-muted-foreground text-sm uppercase tracking-wider">Market Sentiment</span>
        </div>
        <p className={`text-4xl font-bold ${getSentimentColor()}`}>
          {loading ? (
            <span className="inline-block w-48 h-10 bg-muted/50 rounded animate-pulse" />
          ) : (
            sentiment
          )}
        </p>
      </div>

      {/* Gainers and Losers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="glass-card p-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-success/20">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-xl font-semibold">Top Gainers</h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-muted/50" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-muted/50 rounded mb-1" />
                    <div className="h-3 w-16 bg-muted/50 rounded" />
                  </div>
                  <div className="h-6 w-16 bg-muted/50 rounded" />
                </div>
              ))
            ) : (
              gainers.map((coin, index) => (
                <div
                  key={coin.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{coin.name}</p>
                    <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                  <div className="badge-success flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Losers */}
        <div className="glass-card p-6 animate-slide-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-destructive/20">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold">Top Losers</h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-muted/50" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-muted/50 rounded mb-1" />
                    <div className="h-3 w-16 bg-muted/50 rounded" />
                  </div>
                  <div className="h-6 w-16 bg-muted/50 rounded" />
                </div>
              ))
            ) : (
              losers.map((coin, index) => (
                <div
                  key={coin.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{coin.name}</p>
                    <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                  <div className="badge-danger flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" />
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
