
import HeroSection from '../components/home/HeroSection';
import ShowcaseSection from '../components/home/ShowcaseSection';
import ReviewsSection from '../components/home/ReviewsSection';

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <ShowcaseSection />
      <ReviewsSection />
    </div>
  );
};

export default Home;