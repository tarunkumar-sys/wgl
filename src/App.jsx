import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import CustomCursor from "./components/CustomCursor";
import ImpactSection from "./components/ImpactSection";
import TeamSection from "./components/TeamSection";

const App = () => {
  return (
    <>
      <Loader />
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <CustomCursor isActive={true} />
        <AboutSection />
        <ProjectsSection />
        <ImpactSection />
        <TeamSection/>

        {/* <SwiperCarousel data={imageData}/> */}

        <Footer />
      </div>
    </>
  );
};

export default App;
