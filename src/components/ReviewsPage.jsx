// src/pages/ReviewsPage.jsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const data = [
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47172/original/d85ae8c7db2421e9a01ecac942978d4b.png?1685645079&format=webp&resize=400x498&vertical=center",
    name: "Andrea Jelic",
    // title: "Digital Designer",
    testimonial:
      "Their support changed our village's future. We now have hope, clean water, and unity.",
    tags: ["IT", "UI", "Web"],
  },
  {
    type: "video",
    src: "",
    name: "Jesse Showalter",
    // title: "Design Educator",
    testimonial:
      "Amazing guidance and professional support throughout the journey.",
    tags: ["CHANGE MANAGEMENT", "Web", "Mobile"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47171/original/daniele-buffa-3.png?1689174763&format=webp&resize=400x498&vertical=center",
    name: "Daniele Buffa",
    // title: "Principal Designer",
    testimonial: "Working with them made everything smooth and successful.",
    tags: ["Animation", "UI", "Visual"],
  },
  {
    type: "video",
    src: "https://www.shutterstock.com/video/clip-1109739993-indian-ethnic-happy-man-male-wearing-traditional",
    name: "Jesse Showalter",
    // title: "Design Educator",
    testimonial:
      "Amazing guidance and professional support throughout the journey.",
    tags: ["CHANGE MANAGEMENT", "Web", "Mobile"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47171/original/daniele-buffa-3.png?1689174763&format=webp&resize=400x498&vertical=center",
    name: "Daniele Buffa",
    // title: "Principal Designer",
    testimonial: "Working with them made everything smooth and successful.",
    tags: ["Animation", "UI", "Visual"],
  },
  {
    type: "video",
    src: "https://cdn.dribbble.com/uploads/47181/original/1e3a73a174484bef522b620c401cd00a.mp4?1685645427",
    name: "Helen Tran",
    // title: "Lead Product Designer",
    testimonial:
      "They transformed our project with creative and technical expertise.",
    tags: ["Leadership", "Product", "UX"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47178/original/mercedes-bazan.png?1689174566&format=webp&resize=400x498&vertical=center",
    name: "Mercedes Bazan",
    // title: "Illustrator",
    testimonial: "A talented team that delivered beyond expectations.",
    tags: ["Graphic Design", "Illustration"],
  },
  {
    type: "video",
    src: "https://www.shutterstock.com/shutterstock/videos/3462018801/preview/stock-footage--bilaspur-chhattisgarh-india-an-indian-old-man-standing-with-stick-in-his-hand-and.webm",
    name: "Dan Mall",
    // title: "Design Educator",
    testimonial: "Highly professional and innovative approach to design.",
    tags: ["Product", "UX"],
  },
  {
    type: "img",
    src: "https://cdn.dribbble.com/uploads/47175/original/1fb34610061a95a007ac5e7b1dc53138.jpeg?1685645183&format=webp&resize=400x498&vertical=center",
    name: "Victa Wille",
    // title: "Digital Designer",
    testimonial: "Great collaboration and timely delivery of creative work.",
    tags: ["Mobile", "UI", "Web"],
  },
  {
    type: "video",
    src: "https://www.shutterstock.com/shutterstock/videos/1109539465/preview/stock-footage-ponkh-rajasthan-india-october-a-group-of-cheerful-young-indian-rural-boys-and-girls-or.webm",
    name: "Lucy Tyler",
    // title: "Creative Director",
    testimonial: "Our brand reached new heights thanks to their creativity.",
    tags: ["Illustration", "Mobile", "UI"],
  },
  {
    type: "img",
    src: "https://www.shutterstock.com/shutterstock/videos/3834891807/preview/stock-footage-lush-green-hill-landscape-seen-from-moving-indian-train-iphone-shot.webm",
    name: "Lilla Bardenova",
    // title: "Illustrator",
    testimonial:
      "Professional, friendly, and very effective in delivering results.",
    tags: ["Brand", "Illustration", "Web"],
  },
  {
    type: "video",
    src: "https://media.istockphoto.com/id/1174298483/video/confident-young-businesswoman-speaking-to-camera-at-distant-job-interview.mp4?s=mp4-640x640-is&k=20&c=bAVIdBmNKiHNHFozNMHY8Gdnk3cCaCChang2LIJ7C9w=",
    name: "Alexa Star",
    // title: "Brand Designer",
    testimonial:
      "An outstanding experience, delivered exactly what we envisioned.",
    tags: ["Brand", "Illustration", "Web"],
  },
  {
    type: "img",
    src: "https://video-previews.elements.envatousercontent.com/c6ac834f-9999-4178-80a5-f991a4507f8e/watermarked_preview/watermarked_preview.mp4",
    name: "Rafael Benitez",
    // title: "UX Engineer",
    testimonial: "Helped us design an intuitive and beautiful user experience.",
    tags: ["UX", "Engineering", "Mobile"],
  },
  {
    type: "video",
    src: "https://media.istockphoto.com/id/1297843485/video/young-woman-talking-in-online-interview.mp4?s=mp4-640x640-is&k=20&c=3CcuXb_Pt4nA7pT6E0K4hxzFrk5JPqOdsk4diuifhXs=",
    name: "Sophia Li",
    // title: "Product Strategist",
    testimonial: "Their strategy boosted our product adoption significantly.",
    tags: ["Strategy", "Product", "Growth"],
  },
 
];

const ReviewsPage = () => {
  const swiperRef = useRef(null);

  return (
    <section
      id="reviews"
      className="py-16 px-4 sm:px-16 text-white" 
    >
      <div className="text-center max-w-6xl mx-auto">
        <h2 className="text-3xl text-lime-300 font-bold mb-2">
          What people say about us
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Through our dedicated efforts and your support, we've made significant
          progress in environmental conservation.
        </p>
        <div className="w-20 h-1 bg-lime-300 mt-4 mx-auto rounded-full" />

        <div
          className="pt-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            speed={900}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            spaceBetween={25}
            slidesPerView="auto"
                   breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
            className="pb-10"
          >
            {data.map((item, i) => (
              <SwiperSlide key={i} className="w-[300px] sm:w-[360px] flex justify-center">
                <div className="rounded-3xl select-none overflow-hidden w-full sm:w-[360px] h-[340px] sm:h-[440px] relative bg-gradient-to-br from-zinc-800 via-zinc-900 to-black shadow-2xl group transition-all duration-300 hover:border-2 hover:border-lime-300">
                
                  {item.type === "img" ? (
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-300"
                    />
                  ) : (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-300"
                    />
                  )}

                  {/* Tag Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 text-[11px] bg-emerald-300 text-black font-semibold rounded-full shadow">
                    {item.tags[0]}
                  </div>

                  {/* Testimonial Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white backdrop-blur-sm">
                    <p className="text-sm font-light italic text-gray-200 leading-snug mb-3">
                      “{item.testimonial}”
                    </p>

                    <div className="flex flex-col gap-[2px]">
                      <h5 className="text-[14px] font-semibold tracking-wide">
                        {item.name}
                      </h5>
                      <h6 className="text-[11px] text-gray-400">
                        {item.title}
                      </h6>

                      {/* Extra Tags */}
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {item.tags.slice(1).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-white/10 text-white text-[10px] px-2 py-[1px] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
