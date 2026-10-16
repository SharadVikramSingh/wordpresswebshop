import Header from "@/components/layout/Header";
import { getPageBySlug } from "@/lib/wordpress";
import { getSiteOptions } from "@/lib/options";
import HeroSection from "@/components/ui/HeroSection";

export default async function AboutPage() {
  const [aboutPage, options] = await Promise.all([
    getPageBySlug("about"),
    getSiteOptions(),
  ]);

  if (!aboutPage) {
    return (
      <main>
        <h1>About page not found</h1>
        <p>
          Please ensure that a published WordPress page exists
          with the slug "about".
        </p>
      </main>
    );
  }

  return (
    <>
      <Header options={options} />

      <main>
        <HeroSection />

        {/* WordPress About page content */}
        <section className="about-content">
          <h1
            dangerouslySetInnerHTML={{
              __html: aboutPage.title.rendered,
            }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: aboutPage.content.rendered,
            }}
          />
        </section>
      </main>
    </>
  );
}