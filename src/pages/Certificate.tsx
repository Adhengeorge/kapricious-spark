import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Download, Search, FileText, Loader2 } from "lucide-react";

interface DriveFile {
  id: string;
  name: string;
  downloadUrl: string;
}

const Certificate = () => {
  const [query, setQuery] = useState("");
  const [allFiles, setAllFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("list-drive-certificates");
        if (error) throw error;
        setAllFiles(data?.files || []);
      } catch {
        toast.error("Failed to load certificates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const filteredFiles = allFiles.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">
            Get Your <span className="text-primary glow-cyan">Certificate</span>
          </h1>
          <p className="text-muted-foreground">Search by your name or registration ID to find and download your certificate.</p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neon-border rounded-xl p-4 bg-card/50 backdrop-blur mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certificates by name or ID..."
              className="w-full rounded-lg bg-input border border-border pl-10 pr-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        {/* Certificates list */}
        {loading ? (
          <div className="text-center text-muted-foreground py-12">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading certificates...
          </div>
        ) : allFiles.length === 0 ? (
          <div className="neon-border rounded-xl p-8 bg-card/30 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No certificates available yet. Check back later!</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="neon-border rounded-xl p-6 bg-card/30 text-center">
            <p className="text-muted-foreground">No certificates found matching "{query}". Try a different search.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Showing {filteredFiles.length} of {allFiles.length} certificate{allFiles.length !== 1 ? 's' : ''}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredFiles.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="neon-border rounded-xl p-5 bg-card/50 backdrop-blur flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-bold text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">PDF Certificate</p>
                  </div>
                  <a
                    href={file.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 neon-border rounded-lg px-3 py-2 text-xs font-accent tracking-wider uppercase text-primary hover:bg-primary/10 transition-colors shrink-0"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;
