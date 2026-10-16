import Header from "@/components/layout/Header";
import { getPosts } from "@/lib/wordpress";
import { getSiteOptions } from "@/lib/options";
import HeroSection from "@/components/ui/HeroSection";

export default async function HomePage() {
  const [posts, options] = await Promise.all([
    getPosts(),
    getSiteOptions(),
  ]);

  return (
    <>
      <Header options={options} />

      <main>
        <HeroSection />
        
      </main>
    </>
  );
}