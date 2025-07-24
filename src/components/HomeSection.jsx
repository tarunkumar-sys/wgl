// src/components/HomeSection.jsx
import bgVideo from "../assets/video1.mp4";
import bgImage from "/images/img4.avif";

const HomeSection = () => {
  return (
    <section id="home" className="w-full h-screen overflow-hidden ">
     
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to World Green Line
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          Empowering sustainability through green innovations. Join us in shaping a better future.
        </p>
        <button className="mt-8 px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 transition">
          Explore Our Projects
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
