import { useState } from 'react';

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState('openings');
  const [searchTerm, setSearchTerm] = useState('');

  const jobOpenings = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA or Remote',
      type: 'Full-time',
      description: 'We are looking for a skilled Frontend Developer to join our growing engineering team.',
      responsibilities: [
        'Develop new user-facing features',
        'Build reusable components and front-end libraries',
        'Optimize applications for maximum performance',
        'Collaborate with UX designers and backend developers'
      ],
      requirements: [
        '3+ years experience with React',
        'Proficiency in JavaScript, HTML, CSS',
        'Experience with modern frontend tools',
        'Strong problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead product development from conception to launch in this key role.',
      responsibilities: [
        'Define product vision and strategy',
        'Gather and prioritize product requirements',
        'Work closely with engineering, design, and marketing teams',
        'Analyze market trends and competitive landscape'
      ],
      requirements: [
        '5+ years product management experience',
        'Proven track record of managing all aspects of product lifecycle',
        'Technical background with understanding of software development',
        'Excellent communication and leadership skills'
      ]
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Contract',
      description: 'Create amazing user experiences for our digital products.',
      responsibilities: [
        'Design user flows, wireframes, and prototypes',
        'Conduct user research and usability testing',
        'Collaborate with product and engineering teams',
        'Maintain and evolve design systems'
      ],
      requirements: [
        'Portfolio demonstrating UX design skills',
        '3+ years experience in UX/UI design',
        'Proficiency with design tools (Figma, Sketch, etc.)',
        'Understanding of front-end development principles'
      ]
    }
  ];

  const filteredJobs = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Build Your Career With Us
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Join our team of innovators and make an impact every day.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['openings', 'culture', 'benefits', 'process'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'openings' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">Current Job Openings</h2>
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                              <span>{job.department}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                            Apply Now
                          </button>
                        </div>
                        <p className="mt-4 text-gray-600">{job.description}</p>
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              {job.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              {job.requirements.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'culture' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Culture</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-gray-600 mb-6">
                      At our company, we foster a culture of innovation, collaboration, and continuous learning. 
                      We believe that great ideas can come from anywhere, and we empower every team member to 
                      contribute to our shared success.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Our Values</h3>
                      <ul className="space-y-3">
                        {[
                          'Customer Obsession: We start with the customer and work backwards',
                          'Ownership: We think long term and act on behalf of the entire company',
                          'Innovate & Simplify: We expect and require innovation from our teams',
                          'Learn & Be Curious: We are never done learning and seeking to improve',
                          'Deliver Results: We focus on key inputs and deliver with quality'
                        ].map((value, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80" 
                      alt="Company culture" 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Employee Resource Groups</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: 'Women@Work', color: 'bg-purple-100 text-purple-800' },
                      { name: 'Pride Alliance', color: 'bg-red-100 text-red-800' },
                      { name: 'Veterans Network', color: 'bg-green-100 text-green-800' },
                      { name: 'Cultural Heritage', color: 'bg-yellow-100 text-yellow-800' }
                    ].map((group, i) => (
                      <div key={i} className={`${group.color} px-4 py-2 rounded-full text-center font-medium`}>
                        {group.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Employee Benefits</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: 'Health & Wellness',
                      icon: '❤️',
                      items: [
                        'Medical, dental, and vision insurance',
                        'Mental health benefits',
                        'Wellness stipend',
                        'Onsite fitness centers'
                      ]
                    },
                    {
                      title: 'Financial Security',
                      icon: '💰',
                      items: [
                        'Competitive salaries',
                        '401(k) matching',
                        'Stock options',
                        'Student loan assistance'
                      ]
                    },
                    {
                      title: 'Work-Life Balance',
                      icon: '⚖️',
                      items: [
                        'Flexible work arrangements',
                        'Generous PTO policy',
                        'Parental leave',
                        'Paid sabbaticals'
                      ]
                    },
                    {
                      title: 'Learning & Growth',
                      icon: '🎓',
                      items: [
                        'Tuition reimbursement',
                        'Conference budgets',
                        'Internal training programs',
                        'Career coaching'
                      ]
                    },
                    {
                      title: 'Office Perks',
                      icon: '🏢',
                      items: [
                        'Gourmet meals & snacks',
                        'Game rooms',
                        'Pet-friendly offices',
                        'Commuter benefits'
                      ]
                    },
                    {
                      title: 'Community',
                      icon: '🤝',
                      items: [
                        'Team outings',
                        'Volunteer time off',
                        'Employee resource groups',
                        'Company retreats'
                      ]
                    }
                  ].map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-3">{category.title}</h3>
                      <ul className="space-y-2 text-gray-600">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Hiring Process</h2>
                <div className="mb-8">
                  <div className="relative">
                    <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    <div className="space-y-8">
                      {[
                        {
                          name: 'Application Review',
                          description: 'Our recruiting team reviews your application and resume, typically within 1-2 weeks.'
                        },
                        {
                          name: 'Initial Screening',
                          description: 'A 30-minute phone call with a recruiter to discuss your background and the role.'
                        },
                        {
                          name: 'Skills Assessment',
                          description: 'For technical roles, this may include a coding exercise or case study.'
                        },
                        {
                          name: 'Team Interviews',
                          description: 'Virtual or onsite interviews with your potential team members and cross-functional partners.'
                        },
                        {
                          name: 'Decision & Offer',
                          description: 'We aim to provide feedback within 3-5 business days after your final interview.'
                        }
                      ].map((step, index) => (
                        <div key={index} className="relative flex items-start group">
                          <div className="absolute left-5 mt-1.5 h-3 w-3 rounded-full bg-blue-600 group-hover:bg-blue-800 transition-colors"></div>
                          <div className="ml-10">
                            <h3 className="text-lg font-medium text-gray-900">
                              <span className="text-blue-600">Step {index + 1}:</span> {step.name}
                            </h3>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4">Tips for Applicants</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Tailor your resume to highlight relevant experience for the role</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Prepare examples of your work using the STAR method</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Research our company and prepare thoughtful questions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Be ready to discuss both successes and learning experiences</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Show enthusiasm for the role and our mission</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Follow up with a thank you note after interviews</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-700 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-white">Can't Find the Perfect Role?</h2>
              <p className="mt-4 text-blue-200">
                Join our talent community to stay updated on new opportunities that match your skills.
              </p>
              <button className="mt-6 px-6 py-3 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50 transition-colors">
                Join Talent Network
              </button>
            </div>
            <div className="hidden md:block bg-blue-600">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80" 
                alt="Career opportunities" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;