import Hero from "@/components/Hero";
import LiveProofTable from "@/components/Liveprooftable";
import ProjectTimeline from "@/components/Projecttimeline";
import FooterDock from "@/components/Footerdock";
import Nav from "@/components/Nav";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 pb-32">
      <Nav/>
      <Hero />
      <Experience/>
      {/* <Work/> */}
      <Stack/>
      <ProjectTimeline />

      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <LiveProofTable />
      </div>



      <FooterDock />
      <Education/>
      <Contact/>
    </main>
  );
}