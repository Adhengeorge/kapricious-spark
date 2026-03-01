import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("list-drive-certificates");
      if (error) throw error;
      setAllFiles(data?.files || []);
      setFetched(true);
    } catch {
      toast.error("Failed to load certificates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fetched) {
      fetchCertificates();
    }
  };

  const filteredFiles = allFiles.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const displayFiles = query.trim() ? filteredFiles : allFiles;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">
            Get Your <span className="text-primary glow-cyan">Certificate</span>
          </h1>
          <p className="text-muted-foreground">Search by your name or registration ID to find and download your certificate.</p>
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
              placeholder="Your name or registration ID"
              className="flex-1 rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        </motion.form>

        {fetched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            {loading ? (
              <div className="text-center text-muted-foreground py-8">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading certificates...
              </div>
            ) : displayFiles.length === 0 ? (
              <div className="neon-border rounded-xl p-6 bg-card/30 text-center">
                <p className="text-muted-foreground">
                  {query.trim()
                    ? "No certificates found matching your search. Please check and try again."
                    : "No certificates available yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {displayFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
            )}
            {displayFiles.length > 0 && (
              <p className="text-center text-xs text-muted-foreground mt-4">
                Showing {displayFiles.length} certificate{displayFiles.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
