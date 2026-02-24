import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background/80 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold text-primary glow-cyan mb-4">KAPRICIOUS 2026</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            KMEA Engineering College's premier tech fest. Where Innovation Meets Imagination.
          </p>
        </div>
        <div>
          <h4 className="font-accent text-sm tracking-widest uppercase text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ l: "Events", p: "/events" }, { l: "Register", p: "/register" }, { l: "Certificate", p: "/certificate" }].map((x) => (
              <Link key={x.p} to={x.p} className="text-sm text-muted-foreground hover:text-primary transition-colors">{x.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-accent text-sm tracking-widest uppercase text-foreground mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">KMEA Engineering College</p>
          <p className="text-sm text-muted-foreground">Aluva, Ernakulam, Kerala</p>
          <p className="text-sm text-muted-foreground mt-2">kapricious@kmea.edu.in</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Kapricious — KMEA Engineering College. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
