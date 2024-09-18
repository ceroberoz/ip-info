import { NextResponse } from "next/server";

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
    // Fetch IP information
    const ipResponse = await fetch("http://ip-api.com/json");
    const ipData = await ipResponse.json();

    // Generate random string for DNS API
    const randomString = generateRandomString(32);

    // Fetch DNS information
    const dnsResponse = await fetch(
      `http://${randomString}.edns.ip-api.com/json`,
    );
    const dnsData = await dnsResponse.json();

    // Combine the data
    const combinedData = {
      ip: ipData,
      dns: dnsData,
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching information:", error);
    return NextResponse.json(
      { error: "Failed to fetch information" },
      { status: 500 },
    );
  }
}
