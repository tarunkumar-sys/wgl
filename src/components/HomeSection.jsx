
import bgImage from "/images/img4.avif";

import riverraft2 from "../assets/riverraft2.mp4"
// import bgVideo from "../assets/earth.mp4";
// import waves from "../assets/waves.mp4"
// import forest from "../assets/forest.mp4"
// import earth2 from "../assets/earth2.mp4"
// import banaras from "../assets/banaras.mp4"





import { useNavigate, useLocation } from "react-router-dom";

const useVideo = true; // 👉 Change this to false to show image instead of video

const HomeSection = () => {
  const navigate = useNavigate(); // ✅ missing before

  return (
    <section id="home" className="w-full h-screen relative overflow-hidden">
      
      {/* Background */}
      {useVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={riverraft2}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={bgImage}
          alt="Background"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-start text-left text-white px-6 md:px-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to World Green Line
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          Empowering sustainability through green innovations. Join us in shaping a better future.
        </p>
        
        <div className="no-cursor mt-6 flex gap-4">
          <button
            onClick={() => {
              const section = document.getElementById("projects");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
className="relative inline-block group font-semibold px-6 py-4 rounded-3xl border border-green-700 bg-gradient-to-r from-green-600 to-green-700 shadow-lg overflow-hidden">
    <span className="relative z-10 text-white tracking-wide transition-colors duration-300 group-hover:text-green-800">
      Explore Our Projects
    </span>
    <span className="absolute inset-0 bg-white translate-y-full rounded-full transition-all duration-500 group-hover:translate-y-0 group-hover:rounded-none z-0" />
  </button>

  {/* Donate Us Button */}
  <button
    onClick={() => navigate("/donate")}
    className="relative inline-block group font-semibold px-6 py-4 rounded-3xl border border-green-700 bg-gradient-to-r from-green-500 to-green-600 shadow-lg overflow-hidden"
  >
    <span className="relative z-10 text-white tracking-wide transition-colors duration-300 group-hover:text-green-800">
      Donate Us
    </span>
    <span className="absolute inset-0 bg-white translate-y-full rounded-full transition-all duration-500 group-hover:translate-y-0 group-hover:rounded-none z-0" />
  </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
