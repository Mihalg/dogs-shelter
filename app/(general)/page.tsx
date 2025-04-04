import BecomeHeroSection from "./_components/BecomeHeroSection";
import Events from "./_components/EventsSection";
import HeroSection from "./_components/HeroSection";
import LatestPosts from "./_components/LatestPosts";
import RecentlyFoundSection from "./_components/RecentlyFoundSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestPosts />
      <Events />
      <RecentlyFoundSection />
      <BecomeHeroSection />
    </>
  );
}
