import BecomeHeroSection from "./_components/BecomeHeroSection";
import HeroSection from "./_components/HeroSection";
import LatestPosts from "./_components/LatestPosts";
import RecentlyFoundSection from "./_components/RecentlyFoundSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestPosts />
      <RecentlyFoundSection />
      <BecomeHeroSection />
    </>
  );
}
