import dynamic from "next/dynamic";

const IpInfoLandingWithNoSSR = dynamic(
  () => import("@/components/ip-info-landing").then((mod) => mod.IpInfoLanding),
  { ssr: false },
);

export default function Home() {
  return <IpInfoLandingWithNoSSR />;
}
