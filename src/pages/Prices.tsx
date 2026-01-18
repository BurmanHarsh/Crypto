import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Prices() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCoins(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Live Crypto</span> Prices
        </h1>
        <p className="text-muted-foreground">
          Real-time cryptocurrency prices and market data
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-white/10 focus:border-primary/50"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden animate-scale-in" style={{ animationDelay: "0.2s" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">#</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-sm">Name</th>
                <th className="text-right p-4 text-muted-foreground font-medium text-sm">Price</th>
                <th className="text-right p-4 text-muted-foreground font-medium text-sm">24h %</th>
                <th className="text-right p-4 text-muted-foreground font-medium text-sm hidden md:table-cell">Market Cap</th>
                <th className="text-right p-4 text-muted-foreground font-medium text-sm hidden lg:table-cell">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="p-4"><div className="h-4 w-6 bg-muted/50 rounded" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted/50" />
                        <div>
                          <div className="h-4 w-24 bg-muted/50 rounded mb-1" />
                          <div className="h-3 w-12 bg-muted/50 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right"><div className="h-4 w-20 bg-muted/50 rounded ml-auto" /></td>
                    <td className="p-4 text-right"><div className="h-6 w-16 bg-muted/50 rounded ml-auto" /></td>
                    <td className="p-4 text-right hidden md:table-cell"><div className="h-4 w-24 bg-muted/50 rounded ml-auto" /></td>
                    <td className="p-4 text-right hidden lg:table-cell"><div className="h-4 w-20 bg-muted/50 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : (
                filteredCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 text-muted-foreground">{coin.market_cap_rank}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium">{formatPrice(coin.current_price)}</td>
                    <td className="p-4 text-right">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-success bg-success/10"
                            : "text-destructive bg-destructive/10"
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-4 text-right text-muted-foreground hidden md:table-cell">
                      {formatNumber(coin.market_cap)}
                    </td>
                    <td className="p-4 text-right text-muted-foreground hidden lg:table-cell">
                      {formatNumber(coin.total_volume)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
