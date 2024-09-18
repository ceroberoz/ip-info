import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function GET() {
  try {
    const cacheKey = "ip_info_general";

    // Try to get cached data
    let combinedData = await kv.get(cacheKey);

    if (!combinedData) {
      // If no cached data, fetch new data
      const ipResponse = await fetch("http://ip-api.com/json");
      if (!ipResponse.ok) {
        throw new Error(`IP API responded with status: ${ipResponse.status}`);
      }
      const ipData = await ipResponse.json();

      const randomString = generateRandomString(32);
      const dnsResponse = await fetch(
        `http://${randomString}.edns.ip-api.com/json`,
      );
      if (!dnsResponse.ok) {
        throw new Error(`DNS API responded with status: ${dnsResponse.status}`);
      }
      const dnsData = await dnsResponse.json();

      combinedData = {
        ip: ipData,
        dns: dnsData,
      };

      // Cache the data for 1 hour (3600 seconds)
      await kv.set(cacheKey, combinedData, { ex: 3600 });
    }

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching or caching information:", error);
    return NextResponse.json(
      { error: "Failed to fetch or cache information", details: error.message },
      { status: 500 },
    );
  }
}
