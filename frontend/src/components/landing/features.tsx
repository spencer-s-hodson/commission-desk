import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  BarChart3,
  Wallet,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Commission dashboards",
    description:
      "One view for carriers, lines of business, and payout status — filter by producer, agency, or statement cycle.",
  },
  {
    icon: Users,
    title: "Team & producer splits",
    description:
      "Model overrides, referral shares, and hierarchy so every producer sees their number, not just the agency total.",
  },
  {
    icon: CalendarClock,
    title: "Statements & renewals",
    description:
      "Track accruals alongside carrier schedules and policy terms so renewals and chargebacks don't surprise you.",
  },
  {
    icon: BarChart3,
    title: "Reporting & exports",
    description:
      "Month-end summaries, book-of-business snapshots, and CSV exports that match how your finance team works.",
  },
  {
    icon: Wallet,
    title: "Payout clarity",
    description:
      "Reconcile expected vs. received commissions, flag discrepancies, and keep an audit trail for every adjustment.",
  },
  {
    icon: Smartphone,
    title: "Works in the field",
    description:
      "Check status from desktop or phone — built for producers who live between appointments and carrier portals.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Built for brokers, MGAs, and growing agencies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're a solo producer or running a team, CommissionDesk
            replaces scattered spreadsheets with a single source of truth for
            commissions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border border-border hover:shadow-md transition-shadow bg-card"
            >
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
