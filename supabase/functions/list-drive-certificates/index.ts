import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const FOLDER_ID = '1pRrkzxKU5sEajPvqXq7eUtDDGcTHYk1j';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch the public Google Drive folder page and parse file links
    const url = `https://drive.google.com/drive/folders/${FOLDER_ID}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch folder: ${response.status}`);
    }

    const html = await response.text();

    // Parse file entries from the Drive HTML page
    // Google Drive embeds file data in the page as JS arrays
    const files: { id: string; name: string; downloadUrl: string }[] = [];

    // Method 1: Extract from data attributes / JS content
    // Google Drive pages contain file info in patterns like: ["FILE_ID","FILE_NAME",...]
    // Look for patterns with file IDs (33 char alphanumeric) and .pdf names
    const filePattern = /\["([\w-]{25,})","([^"]+\.pdf)"/gi;
    let match;
    const seenIds = new Set<string>();

    while ((match = filePattern.exec(html)) !== null) {
      const id = match[1];
      const name = match[2];
      if (!seenIds.has(id)) {
        seenIds.add(id);
        files.push({
          id,
          name: name.replace(/\.pdf$/i, ''),
          downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
        });
      }
    }

    // Method 2: Alternate pattern - sometimes IDs appear differently
    if (files.length === 0) {
      // Try matching data-id patterns
      const altPattern = /data-id="([\w-]{25,})"[^>]*>[\s\S]*?<div[^>]*class="[^"]*"[^>]*>([^<]*\.pdf)</gi;
      while ((match = altPattern.exec(html)) !== null) {
        const id = match[1];
        const name = match[2].trim();
        if (!seenIds.has(id)) {
          seenIds.add(id);
          files.push({
            id,
            name: name.replace(/\.pdf$/i, ''),
            downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
          });
        }
      }
    }

    // Method 3: Try the embed/viewer page which sometimes exposes file list differently
    if (files.length === 0) {
      const embedUrl = `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#list`;
      const embedResponse = await fetch(embedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (embedResponse.ok) {
        const embedHtml = await embedResponse.text();
        
        // In embedded view, files appear with flip entries
        const embedPattern = /\["([\w-]{25,})","([^"]+)"(?:,"[^"]*"){0,5},"application\/pdf"/gi;
        while ((match = embedPattern.exec(embedHtml)) !== null) {
          const id = match[1];
          const name = match[2];
          if (!seenIds.has(id)) {
            seenIds.add(id);
            files.push({
              id,
              name: name.replace(/\.pdf$/i, ''),
              downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
            });
          }
        }

        // Broader pattern for embedded view
        if (files.length === 0) {
          const broadPattern = /\["(1[\w-]{20,})","([^"]+)"/g;
          while ((match = broadPattern.exec(embedHtml)) !== null) {
            const id = match[1];
            const name = match[2];
            if (name.toLowerCase().endsWith('.pdf') && !seenIds.has(id)) {
              seenIds.add(id);
              files.push({
                id,
                name: name.replace(/\.pdf$/i, ''),
                downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
              });
            }
          }
        }
      }
    }

    files.sort((a, b) => a.name.localeCompare(b.name));

    return new Response(
      JSON.stringify({ files, count: files.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error listing certificates:', err.message);
    return new Response(
      JSON.stringify({ error: err.message, files: [] }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
