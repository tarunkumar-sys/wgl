import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ImpactSection from "./components/ImpactSection";
import TeamSection from "./components/TeamSection";
import ReviewsPage from "./components/ReviewsPage";
import DonatePage from "./components/DonatePage";
import HomeSection from "./components/HomeSection";
import ScrollToTop from "./components/ScrollToTop";
import ContactSection from "./components/ContactSection";
import Admin from "./components/Admin";
import Featuredproject from "./components/Featuredproject";
import BlogsPage from "./pages/BlogsPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import AdminPage from "./pages/AdminPage";

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
  const hideLayout =
    location.pathname.toLowerCase() === "/admin" ||
    location.pathname.toLowerCase() === "/bgadmin";

  return (
    <>
      {!hideLayout && <Loader />}
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />
        <Route path="/bgadmin" element={<AdminPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
