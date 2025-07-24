// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ImpactSection from "./components/ImpactSection";
import TeamSection from "./components/TeamSection";
import CustomCursor from "./components/CustomCursor";
import ReviewsPage from "./components/ReviewsPage"; // Create this page
import DonatePage from "./components/DonatePage"; // Create this page
import HomeSection from "./components/HomeSection"; // Create this section
import ScrollToTop from "./components/ScrollToTop";
import ContactSection from "./components/ContactSection";

const HomePage = () => (
  <div className="mx-auto">
    <CustomCursor isActive={true} />
    <section id="home">
      <HomeSection />
    </section>
    <section id="about">
      <AboutSection />
    </section>
    <section id="projects">
      <ProjectsSection />
    </section>
    <section id="impact">
      <ImpactSection />
    </section>
    <section id="team">
      <TeamSection />
    </section>
    <section id="contact">
      <ContactSection />
    </section>
  </div>
);

const App = () => (
  <Router>
    <Loader />
     <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/donate" element={<DonatePage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
