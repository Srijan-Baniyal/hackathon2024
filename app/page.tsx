import MainSpotLight from "@/components/spotlight/MainSpotLight";

export default function Home() {
  return (
    <>
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MainSpotLight />
      </div>
    </>
  );
}
