import AmbientBackground from "@/components/AmbientBackground";
import AIChatWidget from "@/components/AIChatWidget";
import Navbar from "@/components/Navbar";
import AchievementsSection from "@/sections/AchievementsSection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import ExperienceSection from "@/sections/ExperienceSection";
import FooterSection from "@/sections/FooterSection";
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
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <FooterSection />
      </main>
      <AIChatWidget />
    </>
  );
}