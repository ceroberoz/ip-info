"use client";

import { useState } from "react";
import { Globe, Server, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Head from "next/head";
import "leaflet/dist/leaflet.css";

const MapComponent = dynamic(() => import("./map-component"), { ssr: false });

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

  const handleGetStarted = async () => {
    try {
      const response = await fetch("/api/ip-info");
      if (!response.ok) {
        throw new Error("Failed to fetch IP info");
      }
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.error("Error fetching info:", error);
      setError("Failed to load IP information. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>IP Info IOTA - Detailed IP and DNS Information Tool</title>
        <meta
          name="description"
          content="Get comprehensive insights about your IP address, DNS configuration, and geolocation with IP Info IOTA. A free, user-friendly tool for network diagnostics and location verification."
        />
        <meta
          name="keywords"
          content="IP address, DNS, geolocation, network diagnostics, ISP information, AS lookup, IP tracker, internet connection details"
        />
        <meta
          property="og:title"
          content="IP Info IOTA - Your Complete IP Information Tool"
        />
        <meta
          property="og:description"
          content="Discover detailed information about your IP address, DNS settings, and geographical location with our user-friendly tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ipinfo.iota.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="IP Info IOTA - Comprehensive IP and DNS Insights"
        />
        <meta
          name="twitter:description"
          content="Get in-depth information about your IP address, DNS configuration, and location. Perfect for network diagnostics and location verification."
        />
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <header className="p-4 bg-gray-800 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-green-400">IP Info IOTA</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-green-400">
              Comprehensive IP and DNS Information Tool
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Uncover detailed insights about your IP address, DNS
              configuration, and geographical location.
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-green-500 text-black hover:bg-green-400"
            >
              Analyze My Connection
            </Button>
          </section>

          {error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400">
                    <Globe className="mr-2" />
                    IP Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  {info?.ip ? (
                    <ul className="space-y-2">
                      <li>
                        <strong>IP:</strong> {info.ip.query ?? "N/A"}
                      </li>
                      <li>
                        <strong>Country:</strong> {info.ip.country ?? "N/A"} (
                        {info.ip.countryCode ?? "N/A"})
                      </li>
                      <li>
                        <strong>Region:</strong> {info.ip.regionName ?? "N/A"} (
                        {info.ip.region ?? "N/A"})
                      </li>
                      <li>
                        <strong>City:</strong> {info.ip.city ?? "N/A"}
                      </li>
                      <li>
                        <strong>Timezone:</strong> {info.ip.timezone ?? "N/A"}
                      </li>
                      <li>
                        <strong>ISP:</strong> {info.ip.isp ?? "N/A"}
                      </li>
                      <li>
                        <strong>Organization:</strong> {info.ip.org ?? "N/A"}
                      </li>
                      <li>
                        <strong>AS:</strong>{" "}
                        {info.ip.as ? (
                          <>
                            <a
                              href={`https://bgpview.io/asn/${info.ip.as.split(" ")[0].substring(2)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:underline"
                            >
                              {info.ip.as.split(" ")[0]}
                            </a>
                            {" " + info.ip.as.split(" ").slice(1).join(" ")}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </li>
                    </ul>
                  ) : (
                    <p>Click "Analyze My Connection" to view IP information.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <Server className="mr-2" />
                    DNS Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  {info?.dns ? (
                    <>
                      <h3 className="font-semibold mb-2 text-blue-400">DNS:</h3>
                      <ul className="space-y-2 mb-4">
                        <li>
                          <strong>IP:</strong> {info.dns.dns?.ip ?? "N/A"}
                        </li>
                        <li>
                          <strong>Geo:</strong> {info.dns.dns?.geo ?? "N/A"}
                        </li>
                      </ul>
                      <h3 className="font-semibold mb-2 text-blue-400">
                        EDNS:
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <strong>IP:</strong> {info.dns.edns?.ip ?? "N/A"}
                        </li>
                        <li>
                          <strong>Geo:</strong> {info.dns.edns?.geo ?? "N/A"}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p>
                      Click "Analyze My Connection" to view DNS information.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {info?.ip?.lat && info.ip.lon && (
            <Card className="mt-8 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Geolocation Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <MapComponent lat={info.ip.lat} lon={info.ip.lon} />
                </div>
              </CardContent>
            </Card>
          )}
        </main>

        <footer className="bg-gray-800 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p className="mb-2">
              Powered by{" "}
              <a
                href="https://ip-api.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                ip-api.com
              </a>
            </p>
            <a
              href="https://github.com/ceroberoz/ip-info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-400 hover:underline"
            >
              <Github className="mr-1" size={16} />
              View Source on GitHub
            </a>
            <p className="mt-4">
              &copy; 2023 IP Info IOTA. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
