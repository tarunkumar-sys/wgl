import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

const teamData = [
  {
    name: "Dr. Ananya Sharma",
    title: "Executive Director",
    field: "Leadership",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "Environmental scientist with 15+ years of experience in conservation and sustainable development.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Rajiv Mehta",
    title: "Operations Director",
    field: "Management",
    image:
      "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "Former corporate executive who transitioned to environmental work with expertise in project management.",
    linkedin: "#",
  },
  {
    name: "Priya Verma",
    title: "Design Lead",
    field: "Design",
    image:
      "https://images.unsplash.com/photo-1556575533-7190b053c299?q=80&w=377&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "UX/UI designer passionate about eco-friendly digital products and inclusive design.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Amit Rathi",
    title: "HR Manager",
    field: "HR",
    image:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "HR expert focused on team well-being, diversity and engagement in sustainability projects.",
    linkedin: "#",
  },
  {
    name: "Nisha Kapoor",
    title: "Environmental Analyst",
    field: "Research",
    image:
      "https://images.unsplash.com/photo-1577008491687-618784e40949?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "Data-driven researcher working on environmental impact models and green policy evaluation.",
    linkedin: "#",
  },
  {
    name: "Sameer Joshi",
    title: "Field Operations Officer",
    field: "Management",
    image:
      "https://images.unsplash.com/photo-1634148969837-7feba3939ee3?q=80&w=460&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "Coordinates on-ground environmental clean-up and awareness campaigns across urban areas.",
    linkedin: "#",
  },
  {
    name: "Sanya Bhatia",
    title: "Community Engagement Head",
    field: "Leadership",
    image:
      "https://images.unsplash.com/photo-1637009981125-89e30d29a627?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    description:
      "Expert in building community outreach programs and facilitating grassroots climate action.",
    linkedin: "#",
  },
];

const fields = ["All", "Leadership", "Management", "Design", "HR", "Research"];

const TeamSection = () => {
  const [selectedField, setSelectedField] = useState("All");
  const swiperRef = useRef(null);

  const filteredTeam =
    selectedField === "All"
      ? teamData
      : teamData.filter((member) => member.field === selectedField);

  return (
    <section className="bg-green-950 text-lime-300 py-16 px-4 sm:px-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Our Team</h2>
        <p className="text-base text-gray-300 max-w-xl mx-auto">
          Meet the dedicated professionals working tirelessly to make our
          environmental vision a reality.
        </p>
        <div className="h-1 w-16 bg-lime-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* <div className="flex flex-wrap justify-center gap-3 mb-10">
        {fields.map((field) => (
          <button
            key={field}
            onClick={() => setSelectedField(field)}
            className={`px-4 py-2 rounded-full text-sm font-medium border border-green-400 hover:bg-green-700 transition-all duration-200 ${
              selectedField === field ? 'bg-green-600 text-white' : 'text-green-300'
            }`}
          >
            {field}
          </button>
        ))}
      </div> */}

      <div className="relative max-w-5xl mx-auto">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden sm:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full no-cursor hover:bg-green-600"
        >
          <ChevronLeft className="w-7 h-7 scale-[2] text-white" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden sm:flex absolute  -right-16 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full no-cursor hover:bg-green-600"
        >
          <ChevronRight className="w-6 h-6 scale-[2] text-white" />
        </button>

        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={3}
          initialSlide={3}
          loop={true}
          spaceBetween={60}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 1.5,
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
          className="py-10"
        >
          {filteredTeam.map((member, index) => (
            <SwiperSlide
              key={index}
              className="sm:w-[310px] md:max-w-[280px] lg:max-w-[300px] xl:max-w-[320px] flex justify-center"
            >
              <div className="sm:h-[340px] w-[310px] min-h-[360px] bg-green-800 border border-green-400 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-2 border-lime-300"
                />
                <h4 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-green-400 text-sm mb-1">{member.title}</p>
                <p className="text-xs text-gray-300 mb-4 px-2">
                  {member.description}
                </p>
                <div className="flex justify-center gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin text-white text-lg"></i>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter text-white text-lg"></i>
                    </a>
                  )}
                  <a href="#">
                    <i className="fab fa-facebook text-white text-lg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram text-white text-lg"></i>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
