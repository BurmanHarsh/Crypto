import { ExternalLink, Clock, TrendingUp } from "lucide-react";

// Mock news data since CryptoPanic API requires authentication
const mockNews = [
  {
    id: 1,
    title: "Bitcoin Surges Past $100K as Institutional Adoption Accelerates",
    source: "CoinDesk",
    published_at: "2 hours ago",
    url: "#",
    currencies: ["BTC"],
    kind: "news",
  },
  {
    id: 2,
    title: "Ethereum 2.0 Staking Rewards Hit New Highs",
    source: "The Block",
    published_at: "4 hours ago",
    url: "#",
    currencies: ["ETH"],
    kind: "news",
  },
  {
    id: 3,
    title: "Major Banks Announce Crypto Custody Services Expansion",
    source: "Bloomberg Crypto",
    published_at: "6 hours ago",
    url: "#",
    currencies: ["BTC", "ETH"],
    kind: "news",
  },
  {
    id: 4,
    title: "DeFi Total Value Locked Reaches $200 Billion Milestone",
    source: "DeFi Pulse",
    published_at: "8 hours ago",
    url: "#",
    currencies: ["ETH", "SOL"],
    kind: "news",
  },
  {
    id: 5,
    title: "SEC Approves Additional Spot Bitcoin ETFs",
    source: "Reuters",
    published_at: "10 hours ago",
    url: "#",
    currencies: ["BTC"],
    kind: "news",
  },
  {
    id: 6,
    title: "Solana Network Processes Record 100M Daily Transactions",
    source: "Decrypt",
    published_at: "12 hours ago",
    url: "#",
    currencies: ["SOL"],
    kind: "news",
  },
  {
    id: 7,
    title: "Central Banks Explore CBDC Interoperability Standards",
    source: "Financial Times",
    published_at: "14 hours ago",
    url: "#",
    currencies: [],
    kind: "news",
  },
  {
    id: 8,
    title: "NFT Market Shows Signs of Recovery with Gaming Focus",
    source: "NFT Now",
    published_at: "16 hours ago",
    url: "#",
    currencies: ["ETH"],
    kind: "news",
  },
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Live Crypto</span> News
        </h1>
        <p className="text-muted-foreground">
          Stay updated with the latest cryptocurrency and blockchain news
        </p>
      </div>

      {/* Featured News */}
      <div className="glass-card p-6 mb-8 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Trending</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
          {mockNews[0].title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{mockNews[0].source}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {mockNews[0].published_at}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockNews.slice(1).map((article, index) => (
          <article
            key={article.id}
            className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group animate-slide-in"
            style={{ animationDelay: `${0.2 + index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-muted-foreground font-medium">{article.source}</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.published_at}
                  </div>
                </div>
                {article.currencies.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {article.currencies.map((currency) => (
                      <span
                        key={currency}
                        className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                      >
                        {currency}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
