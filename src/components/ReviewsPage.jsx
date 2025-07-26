// src/pages/ReviewsPage.jsx
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ReviewHighlight from "./ReviewHighlight";

const data = [
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47172/original/d85ae8c7db2421e9a01ecac942978d4b.png?1685645079&format=webp&resize=400x498&vertical=center",
    name: "Andrea Jelic",
    title: "Digital Designer",
    tags: ["IT", "UI", "Web"],
  },
  {
    type: "video",
    src: "https://cdn.dribbble.com/uploads/47180/original/1def7b9fb30832c4af4353b325d9c3af.mp4?1685645402",
    name: "Jesse Showalter",
    title: "Design Educator",
    tags: ["CHANGE MANAGEMENT", "Web", "Mobile"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47171/original/daniele-buffa-3.png?1689174763&format=webp&resize=400x498&vertical=center",
    name: "Daniele Buffa",
    title: "Principal Designer",
    tags: ["Animation", "UI", "Visual"],
  },
  {
    type: "video",
    src: "https://cdn.dribbble.com/uploads/47181/original/1e3a73a174484bef522b620c401cd00a.mp4?1685645427",
    name: "Helen Tran",
    title: "Lead Product Designer",
    tags: ["Leadership", "Product", "UX"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47178/original/mercedes-bazan.png?1689174566&format=webp&resize=400x498&vertical=center",
    name: "Mercedes Bazan",
    title: "Illustrator",
    tags: ["Graphic Design", "Illustration"],
  },
  {
    type: "video",
    src: "https://cdn.dribbble.com/uploads/47179/original/35d07cfebd303e05e688078015da0cc2.mp4?1685645373",
    name: "Dan Mall",
    title: "Design Educator",
    tags: ["Product", "UX"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47175/original/1fb34610061a95a007ac5e7b1dc53138.jpeg?1685645183&format=webp&resize=400x498&vertical=center",
    name: "Victa Wille",
    title: "Digital Designer",
    tags: ["Mobile", "UI", "Web"],
  },
  {
    type: "video",
    src: "https://media.istockphoto.com/id/1394337605/video/young-beautiful-asian-woman-and-professional-beauty-make-up-artist-vlogger-or-blogger.mp4?s=mp4-640x640-is&k=20&c=l79HXQE1GgNo4Fa1r2ev74pfxvJImmIq8Ynuts5A7ds=",
    name: "Lucy Tyler",
    title: "Creative Director",
    tags: ["Illustration", "Mobile", "UI"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47174/original/4f02d72fe701b15b2168a4954332427f.png?1685645150&format=webp&resize=400x498&vertical=center",
    name: "Lilla Bardenova",
    title: "Brand+Illustrator",
    tags: ["Brand", "Illustration", "Web"],
  },
  {
    type: "video",
    src: "https://media.istockphoto.com/id/1174298483/video/confident-young-businesswoman-speaking-to-camera-at-distant-job-interview.mp4?s=mp4-640x640-is&k=20&c=bAVIdBmNKiHNHFozNMHY8Gdnk3cCaCChang2LIJ7C9w=",
    name: "Alexa Star",
    title: "Brand Designer",
    tags: ["Brand", "Illustration", "Web"],
  },
];

const companies = ["https://upload.wikimedia.org/wikipedia/commons/8/84/Bosch-logotype.svg", "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/6/66/Moody%27s_logo.svg"];

const ReviewsPage = () => {
  const swiperRef = useRef(null);

  return (
    <>
        {/* === Top Heading Section with BG image === */}
      <div className="relative h-72 md:h-80 flex items-center justify-center text-center text-white">
        <img
          src="public\images\rew.jpg"
          alt="Header Background"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        />
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Discover What{" "}
            <span className="text-yellow-400">People Say</span> About Us
          </h2>
        </div>
      </div>
     {/* <ReviewHighlight /> */}
    <div className="py-12 bg-green-950 min-h-screen align-centerd text-white">
      <div className="px-16 flex justify-between items-center">
        <h1 className="text-3xl  font-bold">Video Reviews</h1>
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-white text-black rounded-full hover:bg-gray-200"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-white text-black rounded-full hover:bg-gray-200"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
<div className="pt-8"
 style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
>

<Swiper
  modules={[Autoplay]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  loop={true}
  speed={800}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  spaceBetween={20}
  slidesPerView={"auto"}
  centeredSlides={false}
  className="pb-10"
>
        {data.map((item, i) => (
          <SwiperSlide key={i} className="!w-[300px] flex justify-center">
            <div className="rounded-3xl overflow-hidden w-[280px] h-[360px] relative bg-zinc-800 shadow-xl">
              {item.type === "img" ? (
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2 px-3 py-1 text-xs bg-pink-100 text-black font-semibold rounded-full">
                {item.tags[0]}
              </div>
              <img
                src={companies[i % companies.length]}
                alt="company"
                className="absolute top-2 right-2 h-6"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-sm italic font-semibold mb-2">
                  “Amazing experience working with the team!”
                </p>
                <h5 className="text-xs font-bold">{item.name}</h5>
                <h6 className="text-[10px] text-gray-300">{item.title}</h6>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
    </>
  );
};

export default ReviewsPage;
