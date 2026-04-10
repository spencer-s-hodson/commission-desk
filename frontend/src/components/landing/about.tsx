import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-2">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Built with agency ops in mind
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            CommissionDesk came from watching brokers lose hours to carrier
            portals, PDF statements, and broken spreadsheets. The goal is simple:
            give teams one place to see what's earned, what's paid, and what's
            still in flight.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center text-center max-w-md mx-auto">
          <Avatar className="h-28 w-28 mb-5 border-4 border-accent">
            <AvatarImage src="" alt="Founder photo" />
            <AvatarFallback className="text-2xl font-bold bg-accent text-primary">
              YN
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-foreground">Your Name</h3>
          <p className="text-sm text-primary font-medium mt-1">
            Founder & Developer
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
            I'm a developer who has seen too many agencies fly blind on
            commissions. I care about tools that finance can trust and producers
            can actually use — without another all-day training session.
          </p>
        </div>
      </div>
    </section>
  );
};
