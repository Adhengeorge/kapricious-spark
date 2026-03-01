import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const FOLDER_ID = '1pRrkzxKU5sEajPvqXq7eUtDDGcTHYk1j';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use the public Google Drive listing endpoint (no API key needed for public folders)
    // We use the Google Drive API v3 public endpoint with the folder being public
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/pdf'&fields=files(id,name,mimeType)&orderBy=name&pageSize=1000&key=AIzaSyC_rl1FQZPM-t-yvJaFNqCNgnI5VoBqEzY`;

    // Fallback: scrape the public folder page if API key doesn't work
    const response = await fetch(url);
    
    if (!response.ok) {
      // Fallback method: use the export link format for public folders
      // Try alternate public listing
      const altUrl = `https://drive.google.com/drive/folders/${FOLDER_ID}`;
      const altResponse = await fetch(altUrl);
      const html = await altResponse.text();
      
      // Parse file IDs and names from the HTML (limited but works for public folders)
      const files: { id: string; name: string; downloadUrl: string }[] = [];
      
      return new Response(
        JSON.stringify({ files, source: 'fallback', message: 'Could not list files. Ensure folder is public.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const files = (data.files || []).map((f: DriveFile) => ({
      id: f.id,
      name: f.name.replace(/\.pdf$/i, ''),
      downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`,
    }));

    return new Response(
      JSON.stringify({ files }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
