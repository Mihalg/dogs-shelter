import FacebookFeed from "./_components/FacebookFeed";
import HeroSection from "./_components/HeroSection";
import RecentlyFound from "./_components/RecentlyFoundSection";

export default function Home() {
  return (
    <>
      <div className="px-6">
        <HeroSection />
        <FacebookFeed />
      </div>
      <RecentlyFound />
      
    </>
  );
}
