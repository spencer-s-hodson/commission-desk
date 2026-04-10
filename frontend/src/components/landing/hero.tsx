import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="max-w-lg">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
              Commission tracking for insurance teams
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Know exactly what you're owed,{" "}
              <span className="text-primary">before the check lands.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              CommissionDesk brings policies, carriers, splits, and payout status
              into one place — so brokers and agency teams stop reconciling in
              spreadsheets and start closing the month with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="/overview">Try Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">See How It Works</a>
              </Button>
            </div>
          </div>

          {/* Product mockup */}
          <div className="flex justify-center">
            <Card className="w-full max-w-sm shadow-lg border-2 border-accent bg-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">April commissions</h3>
                  <span className="text-xs text-muted-foreground">Statement preview</span>
                </div>

                {[
                  { icon: CheckCircle2, text: "Auto · bundled (Carrier A)", done: true, amount: "$2,450" },
                  { icon: Clock, text: "Commercial GL — endorsement", done: false, amount: "$1,820" },
                  { icon: TrendingUp, text: "Medicare Advantage — new", done: false, amount: "$3,200" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      row.done
                        ? "bg-accent/40 text-muted-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <row.icon size={16} className={row.done ? "text-primary" : "text-muted-foreground"} />
                    <span className={`flex-1 ${row.done ? "line-through" : ""}`}>{row.text}</span>
                    <span className="text-xs font-medium text-primary tabular-nums">{row.amount}</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Posted vs. expected (MTD)</span>
                    <span className="text-primary font-semibold">67%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-primary transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
