import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Ideal for a solo producer validating the workflow.",
    features: [
      "1 producer seat",
      "1 book of business",
      "Basic commission pipeline",
      "7-day activity history",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For small brokerages that need shared visibility.",
    features: [
      "Up to 10 producer seats",
      "Unlimited policies & carriers",
      "Splits, overrides & hierarchy",
      "Statement cycles & reminders",
      "Standard reports & CSV export",
      "90-day history",
    ],
    cta: "Get Team Plan",
    popular: true,
  },
  {
    name: "Agency",
    price: "$129",
    period: "/month",
    description: "For larger teams and multi-location agencies.",
    features: [
      "Unlimited producer seats",
      "Everything in Team",
      "Advanced reconciliation tools",
      "API access (coming soon)",
      "Priority support",
      "Unlimited history",
    ],
    cta: "Talk to Sales",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pricing that scales with your book
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free, add seats as you grow. No per-policy fees on Team and
            Agency — cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular
                  ? "z-10 overflow-visible border-2 border-primary shadow-lg scale-[1.02]"
                  : "border border-border"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 px-3 py-1 text-xs shadow-sm">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-extrabold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {tier.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <ul className="space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
