import { useState } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

const teamData = [
  {
    name: 'Dr. Ananya Sharma',
    title: 'Executive Director',
    field: 'Leadership',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Environmental scientist with 15+ years of experience in conservation and sustainable development.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Rajiv Mehta',
    title: 'Operations Director',
    field: 'Management',
    image: 'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Former corporate executive who transitioned to environmental work with expertise in project management.',
    linkedin: '#',
  },
  {
    name: 'Priya Verma',
    title: 'Design Lead',
    field: 'Design',
    image: 'https://images.unsplash.com/photo-1556575533-7190b053c299?q=80&w=377&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'UX/UI designer passionate about eco-friendly digital products and inclusive design.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Amit Rathi',
    title: 'HR Manager',
    field: 'HR',
    image: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'HR expert focused on team well-being, diversity and engagement in sustainability projects.',
    linkedin: '#',
  },
  {
    name: 'Nisha Kapoor',
    title: 'Environmental Analyst',
    field: 'Research',
    image: 'https://images.unsplash.com/photo-1577008491687-618784e40949?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Data-driven researcher working on environmental impact models and green policy evaluation.',
    linkedin: '#',
  },
  {
    name: 'Sameer Joshi',
    title: 'Field Operations Officer',
    field: 'Management',
    image: 'https://images.unsplash.com/photo-1634148969837-7feba3939ee3?q=80&w=460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Coordinates on-ground environmental clean-up and awareness campaigns across urban areas.',
    linkedin: '#',
  },
  {
    name: 'Sanya Bhatia',
    title: 'Community Engagement Head',
    field: 'Leadership',
    image: 'https://images.unsplash.com/photo-1637009981125-89e30d29a627?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzczfHxwcm9maWxlJTIwaW1hZ2VzfGVufDB8fDB8fHww',
    description:
      'Expert in building community outreach programs and facilitating grassroots climate action.',
    linkedin: '#',
  },
];

const fields = ['All', 'Leadership', 'Management', 'Design', 'HR', 'Research'];

const TeamSection = () => {
  const [selectedField, setSelectedField] = useState('All');
  const [startIndex, setStartIndex] = useState(0);

  const filteredTeam =
    selectedField === 'All'
      ? teamData
      : teamData.filter((member) => member.field === selectedField);

  const visibleTeam = filteredTeam.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex + 3 < filteredTeam.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  return (
    <section className="bg-green-950 text-lime-300 py-16 px-4 md:px-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Team</h2>
        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto">
          Meet the dedicated professionals working tirelessly to make our environmental vision a reality.
        </p>
        <div className="h-1 w-16 bg-lime-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {fields.map((field) => (
          <button
            key={field}
            onClick={() => {
              setSelectedField(field);
              setStartIndex(0);
            }}
            className={`px-4 py-1 rounded-full text-sm font-medium border border-green-400 hover:bg-green-700 transition ${
              selectedField === field ? 'bg-green-600 text-white' : 'text-green-300'
            }`}
          >
            {field}
          </button>
        ))}
      </div>

      {/* Team Cards */}
      <div className="relative">
        {filteredTeam.length > 3 && (
          <div className="absolute right-0 -top-16 flex gap-2">
            <button onClick={handlePrev} disabled={startIndex === 0}>
              <ArrowLeftCircle className="w-8 h-8 text-green-400 hover:text-green-300 disabled:opacity-30" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + 3 >= filteredTeam.length}
            >
              <ArrowRightCircle className="w-8 h-8 text-green-400 hover:text-green-300 disabled:opacity-30" />
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 justify-center">
          {visibleTeam.map((member, index) => (
            <div
              key={index}
              className="bg-green-800 border border-green-400 rounded-2xl p-7 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center mx-auto"
              style={{ width: "300px", minHeight: "350px" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-lg font-bold text-white">{member.name}</h4>
              <p className="text-green-400 text-sm mb-2">{member.title}</p>
              <p className="text-xs text-gray-300 mb-3">{member.description}</p>
              <div className="flex justify-center gap-3">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin text-white"></i>
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter text-white"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
