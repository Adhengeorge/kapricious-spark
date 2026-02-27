import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple XLSX generator (no external deps)
function generateXLSX(rows: Record<string, string>[], headers: string[]): Uint8Array {
  // Generate CSV-like XML spreadsheet (Excel 2003 XML format)
  let xml = '<?xml version="1.0"?>\n';
  xml += '<?mso-application progid="Excel.Sheet"?>\n';
  xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
  xml += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
  xml += '<Worksheet ss:Name="Registrations">\n<Table>\n';

  // Header row
  xml += '<Row>\n';
  for (const h of headers) {
    xml += `<Cell><Data ss:Type="String">${escapeXml(h)}</Data></Cell>\n`;
  }
  xml += '</Row>\n';

  // Data rows
  for (const row of rows) {
    xml += '<Row>\n';
    for (const h of headers) {
      const key = h.toLowerCase().replace(/ /g, '_');
      xml += `<Cell><Data ss:Type="String">${escapeXml(row[key] || '')}</Data></Cell>\n`;
    }
    xml += '</Row>\n';
  }

  xml += '</Table>\n</Worksheet>\n</Workbook>';
  return new TextEncoder().encode(xml);
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify admin
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(authHeader.replace('Bearer ', ''));
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const { eventId } = await req.json();

    let query = supabase
      .from('registrations')
      .select('*, events(title), departments(name, code)')
      .order('created_at', { ascending: false });

    if (eventId && eventId !== 'all') {
      query = query.eq('event_id', eventId);
    }

    const { data: registrations, error } = await query;
    if (error) throw error;

    const headers = ['Name', 'Email', 'Phone', 'College', 'Department', 'Event', 'Transaction_ID', 'Screenshot_Link', 'Payment_Status', 'Registration_Time'];

    const rows = (registrations || []).map((r: any) => ({
      name: r.name,
      email: r.email,
      phone: r.phone,
      college: r.college,
      department: r.departments?.name || '',
      event: r.events?.title || '',
      transaction_id: r.transaction_id || '',
      screenshot_link: r.screenshot_url || '',
      payment_status: r.payment_status || 'pending',
      registration_time: r.created_at ? new Date(r.created_at).toLocaleString() : '',
    }));

    const xlsxBytes = generateXLSX(rows, headers);
    const base64 = btoa(String.fromCharCode(...xlsxBytes));

    const eventTitle = eventId && eventId !== 'all' && registrations?.[0]
      ? (registrations[0] as any).events?.title?.replace(/\s+/g, '_') || eventId
      : 'all_events';

    return new Response(
      JSON.stringify({ base64, filename: `registrations_${eventTitle}.xls` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
