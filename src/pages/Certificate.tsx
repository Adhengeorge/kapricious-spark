import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Download, Search, FileText, Loader2 } from "lucide-react";

interface DriveFile {
  id: string;
  name: string;
}

const Certificate = () => {
  const [query, setQuery] = useState("");
  const [allFiles, setAllFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

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

  const handleDownload = async (file: DriveFile) => {
    setDownloading(file.id);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/download-certificate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: anonKey,
          },
          body: JSON.stringify({ fileId: file.id, fileName: file.name }),
        }
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download certificate.");
    } finally {
      setDownloading(null);
    }
  };

  const filteredFiles = allFiles.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">Achievements</span>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
            YOUR <span className="text-accent">CERTIFICATES</span>
          </h1>
          <p className="text-sm text-muted-foreground">Search by your name or registration ID to find and download your certificate.</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-large border border-border p-4 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certificates by name or ID..."
              className="w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all placeholder:text-muted-foreground/40"
            />
          </div>
        </motion.div>

        {/* Certificates list */}
        {loading ? (
          <div className="bg-card rounded-large border border-border p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading certificates...</p>
          </div>
        ) : allFiles.length === 0 ? (
          <div className="bg-card rounded-large border border-border p-12 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No certificates available yet. Check back later!</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="bg-card rounded-large border border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">No certificates found matching "{query}". Try a different search.</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] text-muted-foreground mb-4 uppercase tracking-widest">
              Showing {filteredFiles.length} of {allFiles.length} certificate{allFiles.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredFiles.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group bg-card rounded-2xl border border-border p-5 flex items-center gap-4 hover:border-muted-foreground/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">PDF Certificate</p>
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    disabled={downloading === file.id}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors shrink-0 disabled:opacity-50"
                  >
                    {downloading === file.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
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
