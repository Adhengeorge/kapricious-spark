import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Download, Search } from "lucide-react";

interface CertResult {
  id: string;
  participant_name: string;
  participant_email: string;
  certificate_url: string;
  events: { title: string } | null;
}

const Certificate = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CertResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    const trimmed = query.trim();
    const { data, error } = await supabase
      .from("certificates")
      .select("id, participant_name, participant_email, certificate_url, events(title)")
      .or(`participant_email.ilike.%${trimmed}%,participant_name.ilike.%${trimmed}%`);

    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setResults((data as unknown as CertResult[]) || []);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">
            Get Your <span className="text-primary glow-cyan">Certificate</span>
          </h1>
          <p className="text-muted-foreground">Enter your name or email to find your certificate.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="neon-border rounded-xl p-6 bg-card/50 backdrop-blur"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Your name or email"
              className="flex-1 rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </motion.form>

        {searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Searching...</div>
            ) : results.length === 0 ? (
              <div className="neon-border rounded-xl p-6 bg-card/30 text-center">
                <p className="text-muted-foreground">No certificates found. Please check your name or email and try again.</p>
              </div>
            ) : (
              results.map((cert) => (
                <div key={cert.id} className="neon-border rounded-xl p-5 bg-card/50 backdrop-blur flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">{cert.participant_name}</p>
                    <p className="text-xs text-muted-foreground">{cert.events?.title}</p>
                  </div>
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 neon-border rounded-lg px-4 py-2 text-xs font-accent tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Download
                  </a>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
