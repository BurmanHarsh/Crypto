import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BitcoinETF() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-in">
        <ArrowLeft className="w-4 h-4" />
        Back to News
      </Link>

      {/* Article Header */}
      <article className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Analysis
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-bitcoin/10 text-bitcoin">
              Bitcoin
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Bitcoin ETF: What It Means for <span className="gradient-text">Crypto Markets</span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              January 17, 2026
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </div>
            <Button variant="ghost" size="sm" className="ml-auto gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="glass-card p-8 mb-8">
            <p className="text-xl text-muted-foreground leading-relaxed mb-0">
              Bitcoin ETFs have fundamentally changed institutional access to cryptocurrency by allowing 
              exposure without direct custody. This has dramatically increased both liquidity and 
              institutional participation in the market.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">What is a Bitcoin ETF?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A Bitcoin Exchange-Traded Fund (ETF) is a financial product that tracks the price of Bitcoin 
            and trades on traditional stock exchanges. This allows investors to gain exposure to Bitcoin's 
            price movements without needing to directly purchase, store, or secure the cryptocurrency themselves.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Impact on Institutional Investment</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The approval of spot Bitcoin ETFs has opened the floodgates for institutional investment. 
            Pension funds, endowments, and wealth managers can now allocate to Bitcoin through familiar 
            investment vehicles, eliminating the operational complexities of crypto custody.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="glass-card p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">$50B+</p>
              <p className="text-sm text-muted-foreground">AUM in Bitcoin ETFs</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-3xl font-bold text-success mb-2">1000+</p>
              <p className="text-sm text-muted-foreground">Institutional Holders</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-3xl font-bold text-ethereum mb-2">40%</p>
              <p className="text-sm text-muted-foreground">Reduced Volatility</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Market Implications</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The introduction of regulated Bitcoin investment products has several key implications:
          </p>
          <ul className="space-y-3 text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>Increased market liquidity through traditional trading channels</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>Greater price discovery efficiency with institutional participation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>Potential for reduced volatility as the investor base broadens</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>Paving the way for ETFs tracking other cryptocurrencies</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>
          <p className="text-muted-foreground leading-relaxed">
            As the cryptocurrency market matures, Bitcoin ETFs represent a bridge between traditional 
            finance and digital assets. The success of these products may accelerate regulatory clarity 
            and encourage the development of similar products for other cryptocurrencies.
          </p>
        </div>
      </article>
    </div>
  );
}
