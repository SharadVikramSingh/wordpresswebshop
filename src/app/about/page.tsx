import AboutSection from "@/components/sections/home/AboutSection";
import ProjectsSection from "@/components/sections/home/ProjectsSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import HeroSection from "@/components/sections/home/HeroSection";
import MethodSection from "@/components/sections/home/MethodSection";
import BlogSection from "@/components/sections/home/BlogSection";

export default function Page(){
 return <>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <MethodSection />
    <BlogSection />
</>
}