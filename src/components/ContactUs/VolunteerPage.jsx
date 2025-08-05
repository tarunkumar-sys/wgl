import { useState } from 'react';

const VolunteerPage = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const volunteerRoles = [
    {
      id: 1,
      title: 'Community Outreach Volunteer',
      location: 'Local Community Centers',
      timeCommitment: '4-8 hours/week',
      description: 'Help us connect with local communities and spread awareness about our initiatives.',
      skills: ['Communication', 'Public Speaking', 'Community Engagement']
    },
    {
      id: 2,
      title: 'Event Planning Volunteer',
      location: 'Various Locations',
      timeCommitment: 'Flexible, event-based',
      description: 'Assist in organizing and executing fundraising and awareness events.',
      skills: ['Organization', 'Teamwork', 'Creativity']
    },
    {
      id: 3,
      title: 'Digital Content Volunteer',
      location: 'Remote',
      timeCommitment: '2-5 hours/week',
      description: 'Create engaging content for our social media platforms and website.',
      skills: ['Content Creation', 'Social Media', 'Basic Design']
    }
  ];

  const testimonials = [
    {
      quote: "Volunteering here has been one of the most rewarding experiences of my life. I've grown both personally and professionally.",
      name: "Sarah Johnson",
      role: "Volunteer since 2020"
    },
    {
      quote: "The team makes you feel valued and appreciated. You can really see the impact of your work in the community.",
      name: "Michael Chen",
      role: "Event Volunteer"
    },
    {
      quote: "Flexible hours and meaningful work - perfect for students or professionals looking to give back.",
      name: "David Martinez",
      role: "Digital Volunteer"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Volunteer With Us
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Make a difference in your community while gaining valuable experience.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['opportunities', 'impact', 'stories', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'opportunities' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Volunteer Opportunities</h2>
                <div className="space-y-6">
                  {volunteerRoles.map((role) => (
                    <div key={role.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{role.title}</h3>
                          <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                            <span>{role.location}</span>
                            <span>•</span>
                            <span>{role.timeCommitment}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                          Apply to Volunteer
                        </button>
                      </div>
                      <p className="mt-4 text-gray-600">{role.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Helpful Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Volunteer Impact</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">1,200+</div>
                    <div className="text-gray-600">Active Volunteers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">25,000+</div>
                    <div className="text-gray-600">Hours Contributed Annually</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
                    <div className="text-gray-600">Communities Served</div>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4">How Volunteers Make a Difference</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Our volunteers are the backbone of our organization. Through their dedication and hard work, 
                        we're able to extend our reach and amplify our impact in communities that need it most.
                      </p>
                      <p className="text-gray-600">
                        Whether you're helping at events, contributing your professional skills, or spreading awareness 
                        in your network, every hour you give makes a tangible difference in people's lives.
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80" 
                        alt="Volunteer impact" 
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stories' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Stories</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-green-600 text-4xl mb-4">"</div>
                      <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
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
                      question: 'Do I need prior experience to volunteer?',
                      answer: 'No prior experience is needed for most roles. We provide training and support to all our volunteers.'
                    },
                    {
                      question: 'Can I volunteer remotely?',
                      answer: 'Yes, we have both in-person and remote volunteer opportunities available.'
                    },
                    {
                      question: 'Is there a minimum time commitment?',
                      answer: 'It varies by role, but we have opportunities ranging from one-time events to ongoing commitments.'
                    },
                    {
                      question: 'Can students volunteer?',
                      answer: 'Absolutely! We welcome volunteers of all ages, though some roles may have age restrictions.'
                    },
                    {
                      question: 'Do you offer volunteer recognition?',
                      answer: 'Yes, we provide certificates, letters of recommendation, and celebrate our volunteers through appreciation events.'
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12 bg-green-700">
              <h2 className="text-2xl font-bold text-white">Join Our Volunteer Community</h2>
              <p className="mt-4 text-green-200">
                Ready to make a difference? We'd love to have you on our team.
              </p>
              <button className="mt-6 px-6 py-3 bg-white text-green-700 rounded-md font-medium hover:bg-green-50 transition-colors">
                Become a Volunteer
              </button>
            </div>
            <div className="p-8 sm:p-12 bg-green-600">
              <h2 className="text-2xl font-bold text-white">Corporate Volunteering</h2>
              <p className="mt-4 text-green-200">
                Learn about group volunteering opportunities for your organization.
              </p>
              <button className="mt-6 px-6 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-green-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;