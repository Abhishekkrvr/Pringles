import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import Process from "@/components/Process";
import FlavorStage from "@/components/FlavorStage";
import FlavorGrid from "@/components/FlavorGrid";
import FAQ from "@/components/FAQ";
import Finale from "@/components/Finale";
import FloatingCrumbs from "@/components/FloatingCrumbs";
import IntroSplash from "@/components/IntroSplash";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <IntroSplash />
      <CustomCursor />
      <ScrollProgressBar />
      <FloatingCrumbs />
      <Nav />
      <main>
        <Hero />
        <StatsBand />
        <Process />
        <FlavorStage />
        <FlavorGrid />
        <FAQ />
        <Finale />
      </main>
    </SmoothScrollProvider>
  );
}
