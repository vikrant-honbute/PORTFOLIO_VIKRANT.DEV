import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import HeroSection from "@/sections/HeroSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}