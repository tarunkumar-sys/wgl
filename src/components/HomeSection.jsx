import bgVideo from "../assets/earth.mp4";
import bgImage from "/images/img4.avif";

const useVideo = true; // 👉 Change this to false to show image instead of video

const HomeSection = () => {
  return (
    <section id="home" className="w-full h-screen relative overflow-hidden">
      
      {/* Background */}
      {useVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={bgVideo}
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

      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-black/40 z-10" />

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
