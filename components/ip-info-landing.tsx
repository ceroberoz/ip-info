import { useState, useEffect } from "react";
import { Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kv } from "@vercel/kv";

interface IpInfo {
  query: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

interface DnsInfo {
  dns: {
    ip: string;
    geo: string;
  };
  edns: {
    ip: string;
    geo: string;
  };
}

interface CombinedInfo {
  ip: IpInfo;
  dns: DnsInfo;
}

export function IpInfoLanding() {
  const [info, setInfo] = useState<CombinedInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      try {
        // Try to get cached data from Vercel KV
        const cachedInfo = await kv.get<CombinedInfo>("ip_dns_info");

        if (cachedInfo) {
          setInfo(cachedInfo);
        } else {
          // If no cached data, fetch from API
          const response = await fetch("/api/ip-info");
          if (!response.ok) {
            throw new Error("Failed to fetch IP info");
          }
          const data = await response.json();

          // Cache the data in Vercel KV for 1 hour
          await kv.set("ip_dns_info", data, { ex: 3600 });

          setInfo(data);
        }
      } catch (error) {
        console.error("Error fetching info:", error);
        setError("Failed to load IP information. Please try again later.");
      }
    }

    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="p-4 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">IP Info Pro</h1>
          <Button>Sign Up</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Your IP Information at a Glance
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover detailed insights about your IP address and DNS
            configuration.
          </p>
          <Button size="lg">Get Started</Button>
        </section>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2" />
                  IP Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {info?.ip ? (
                  <ul className="space-y-2">
                    <li>
                      <strong>IP:</strong> {info.ip.query}
                    </li>
                    <li>
                      <strong>Country:</strong> {info.ip.country} (
                      {info.ip.countryCode})
                    </li>
                    <li>
                      <strong>Region:</strong> {info.ip.regionName} (
                      {info.ip.region})
                    </li>
                    <li>
                      <strong>City:</strong> {info.ip.city}
                    </li>
                    <li>
                      <strong>Coordinates:</strong> {info.ip.lat}, {info.ip.lon}
                    </li>
                    <li>
                      <strong>Timezone:</strong> {info.ip.timezone}
                    </li>
                    <li>
                      <strong>ISP:</strong> {info.ip.isp}
                    </li>
                    <li>
                      <strong>Organization:</strong> {info.ip.org}
                    </li>
                    <li>
                      <strong>AS:</strong> {info.ip.as}
                    </li>
                  </ul>
                ) : (
                  <p>Loading IP information...</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2" />
                  DNS Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {info?.dns ? (
                  <>
                    <h3 className="font-semibold mb-2">DNS:</h3>
                    <ul className="space-y-2 mb-4">
                      <li>
                        <strong>IP:</strong> {info.dns.dns.ip}
                      </li>
                      <li>
                        <strong>Geo:</strong> {info.dns.dns.geo}
                      </li>
                    </ul>
                    <h3 className="font-semibold mb-2">EDNS:</h3>
                    <ul className="space-y-2">
                      <li>
                        <strong>IP:</strong> {info.dns.edns.ip}
                      </li>
                      <li>
                        <strong>Geo:</strong> {info.dns.edns.geo}
                      </li>
                    </ul>
                  </>
                ) : (
                  <p>Loading DNS information...</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 IP Info Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
