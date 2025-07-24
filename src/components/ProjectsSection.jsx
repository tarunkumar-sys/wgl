import React, { useState } from "react";
import {
  CheckCircle,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const typeColors = {
  forest: "bg-lime-400",
  water: "bg-blue-400",
  infra: "bg-cyan-400",
};

const projects = [
  {
    title: "Tree Planting Initiative",
    status: "Ongoing",
    tag: "Collaboration with ONGC",
    description:
      "We’ve successfully planted 1,000 trees in rural schools, creating green spaces for students and improving local air quality.",
    progress: 75,
    type: "forest",
    img: "/images/img1.webp",
    bgColor: "bg-green-800",
  },
  {
    title: "Pond Restoration",
    status: "Completed",
    tag: "Community Project",
    description:
      "We’ve successfully restored a local pond, improving water quality and creating a thriving ecosystem for local wildlife and communities.",
    progress: 100,
    type: "water",
    img: "/images/img3.jpg",
    bgColor: "forest",
  },
  {
    title: "Water Tank Construction",
    status: "In Progress",
    tag: "ONGC CSR Project",
    description:
      "Building a water tank to provide clean water access to rural communities, improving health and sanitation for hundreds of families.",
    progress: 60,
    type: "infra",
    img: "/images/img2.jpg",
    bgColor: "bg-cyan-900",
  },
  {
    title: "Solar Panel Installation",
    status: "Planned",
    tag: "Sustainable Energy",
    description:
      "Installing solar panels in remote schools to reduce energy costs and promote clean energy use.",
    progress: 35,
    type: "infra",
    img: "/images/img4.avif",
    bgColor: "bg-yellow-900",
  },
];

const timeline = [
  {
    title: "Project Initiation",
    description: "Partnership agreement with ONGC for CSR funding",
    date: "January 2023",
    color: "text-green-400",
  },
  {
    title: "Tree Planting Phase",
    description: "1,000 trees planted across 10 rural schools",
    date: "March–May 2023",
    color: "text-lime-300",
  },
  {
    title: "Pond Restoration",
    description: "Complete restoration of community pond",
    date: "June–August 2023",
    color: "text-blue-400",
  },
  {
    title: "Water Tank Construction",
    description: "Building water storage and filtration system",
    date: "September 2023 – Present",
    color: "text-cyan-300",
  },
  {
    title: "Project Completion",
    description: "Final evaluation and community handover",
    date: "Expected March 2024",
    color: "text-purple-300",
  },
];

const ProjectsSection = () => {
  const visible = 3;
  const [start, setStart] = useState(0);

  const next = () => setStart((s) => (s + 1) % projects.length);
  const prev = () =>
    setStart((s) => (s - 1 + projects.length) % projects.length);

  const getVisibleProjects = () => {
    const result = [];
    for (let i = 0; i < visible; i++) {
      result.push(projects[(start + i) % projects.length]);
    }
    return result;
  };

  return (
    <section className=" text-white px-4 sm:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-300">
            Our Projects
          </h2>
          <p className="text-gray-300 mt-2 max-w-xl mx-auto">
            Discover our ongoing initiatives to restore and protect our
            environment through sustainable practices and community engagement.
          </p>
          <div className="h-1 w-24 bg-lime-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative mb-16">
          <button
            onClick={prev}
            className="absolute no-cursor -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">
            {getVisibleProjects().map((p, i) => (
              <div
                key={i}
                className={`rounded-xl shadow-md overflow-hidden flex flex-col ${p.bgColor} transition-transform duration-300 hover:scale-105`}
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-sm flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-700 px-2 py-0.5 rounded-full text-xs font-semibold uppercase">
                        {p.status}
                      </span>
                      <span className="text-gray-300 text-xs">{p.tag}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{p.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Progress</span>
                      <span className="text-white font-medium">
                        {p.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          typeColors[p.type]
                        } transition-all duration-700 ease-in-out`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="absolute no-cursor -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-[#09513A] p-6 sm:p-10 rounded-xl shadow-lg"> 
          <div>
            <div className="flex items-center mb-4">
              <Star className="text-lime-400 w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold text-lime-300">
                Featured Project
              </h3>
            </div>
            <h4 className="text-xl font-bold mb-3">
              ONGC Partnership: Green Schools Initiative
            </h4>
            <p className="text-sm text-gray-300 mb-4">
              Our flagship collaboration with ONGC has enabled us to transform
              rural schools into green hubs with sustainable practices,
              environmental education, and improved infrastructure.
            </p>
            <ul className="text-sm space-y-2 text-gray-200">
              {[
                "1,000 trees planted across 10 schools",
                "Environmental education for 2,500+ students",
                "Clean water access for entire communities",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-lime-400 mr-2 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg  font-bold mb-4">Project Timeline</h4>
            <ul className="space-y-4 text-sm">
              {timeline.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <Clock className={`w-5 h-5 mt-1 ${item.color}`} />
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-gray-300">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
