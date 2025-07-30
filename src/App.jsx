import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ImpactSection from "./components/ImpactSection";
import TeamSection from "./components/TeamSection";
// import CustomCursor from "./components/CustomCursor";
import ReviewsPage from "./components/ReviewsPage";
import DonatePage from "./components/DonatePage";
import HomeSection from "./components/HomeSection";
import ScrollToTop from "./components/ScrollToTop";
import ContactSection from "./components/ContactSection";
import Admin from "./components/Admin";
import Featuredproject from "./components/Featuredproject";

const HomePage = () => (
  <div className="mx-auto">
    <section id="home"><HomeSection /></section>
    <section id="about"><AboutSection /></section>
    <section id="projects"><ProjectsSection /></section>
    <Featuredproject />
    <section id="impact"><ImpactSection /></section>
    <section id="team"><TeamSection /></section>
    <section id="Reviews"><ReviewsPage /></section>
    <section id="contact"><ContactSection /></section>
  </div>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.toLowerCase() === "/admin";

  return (
    <>
      {!isAdminPage && <Loader />}
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
