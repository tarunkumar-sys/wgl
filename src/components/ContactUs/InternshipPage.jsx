import { useState } from 'react';

const InternshipPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const internships = [
    {
      id: 1,
      title: 'Software Development Intern',
      department: 'Engineering',
      location: 'Remote',
      duration: '3-6 months',
      description: 'Work on cutting-edge projects with our engineering team, gaining hands-on experience with modern web technologies.',
      responsibilities: [
        'Assist in developing and maintaining web applications',
        'Participate in code reviews and team meetings',
        'Learn and apply best practices in software development'
      ]
    },
    {
      id: 2,
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'New York, NY',
      duration: '3 months',
      description: 'Support our marketing team in creating campaigns and analyzing market trends.',
      responsibilities: [
        'Assist in social media content creation',
        'Conduct market research and competitor analysis',
        'Help organize marketing events'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Internship Opportunities
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Launch your career with hands-on experience and mentorship from industry leaders.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'openings', 'benefits', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Internship Program</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Our internship program is designed to provide meaningful, real-world experience that complements your academic studies. 
                      You'll work on impactful projects, receive mentorship from experienced professionals, and develop skills that will 
                      accelerate your career.
                    </p>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-indigo-800 mb-2">Program Highlights</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>12-week immersive experience</li>
                        <li>1:1 mentorship with industry experts</li>
                        <li>Networking opportunities with leadership</li>
                        <li>Competitive stipend and benefits</li>
                        <li>Potential for full-time conversion</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80" 
                      alt="Internship program" 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'openings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Openings</h2>
                <div className="space-y-6">
                  {internships.map((internship) => (
                    <div key={internship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{internship.title}</h3>
                          <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                            <span>{internship.department}</span>
                            <span>•</span>
                            <span>{internship.location}</span>
                            <span>•</span>
                            <span>{internship.duration}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                          Apply Now
                        </button>
                      </div>
                      <p className="mt-4 text-gray-600">{internship.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900">Key Responsibilities:</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                          {internship.responsibilities.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Intern Benefits</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Learning & Development',
                      icon: '🎓',
                      description: 'Access to training resources, workshops, and mentorship programs'
                    },
                    {
                      title: 'Networking',
                      icon: '🤝',
                      description: 'Connect with professionals across different departments and levels'
                    },
                    {
                      title: 'Flexible Work',
                      icon: '⏱️',
                      description: 'Remote options and flexible hours to accommodate your schedule'
                    },
                    {
                      title: 'Stipend',
                      icon: '💰',
                      description: 'Competitive compensation for your contributions'
                    },
                    {
                      title: 'Wellness',
                      icon: '🧘',
                      description: 'Mental health resources and wellness programs'
                    },
                    {
                      title: 'Social Events',
                      icon: '🎉',
                      description: 'Team outings, happy hours, and intern-specific events'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: 'What are the eligibility requirements?',
                      answer: 'Our internships are open to current students (undergraduate or graduate) or recent graduates within 12 months of graduation. Some roles may have specific academic requirements.'
                    },
                    {
                      question: 'When is the application deadline?',
                      answer: 'We accept applications on a rolling basis until all positions are filled. We recommend applying as early as possible.'
                    },
                    {
                      question: 'Is the internship paid?',
                      answer: 'Yes, all our internships offer competitive compensation.'
                    },
                    {
                      question: 'Can international students apply?',
                      answer: 'Yes, we welcome applications from international students who have proper work authorization for the internship location.'
                    },
                    {
                      question: 'What is the interview process like?',
                      answer: 'Our process typically includes an initial phone screen, a technical or skills assessment (depending on the role), and final interviews with team members.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-gray-900">{faq.question}</h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-indigo-700 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-white">Ready to apply?</h2>
              <p className="mt-4 text-indigo-200">
                Submit your application today and take the first step toward an exciting career.
              </p>
              <button className="mt-6 px-6 py-3 bg-white text-indigo-700 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                Start Application
              </button>
            </div>
            <div className="hidden md:block bg-indigo-600">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80" 
                alt="Internship application" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;