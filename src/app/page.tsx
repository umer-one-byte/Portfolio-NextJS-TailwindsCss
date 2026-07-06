import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Contact />
    </main>
  );
}
