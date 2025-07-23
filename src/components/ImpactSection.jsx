import { CheckCircle, Leaf, Droplets, Globe, Handshake } from "lucide-react";

export default function ImpactSection() {
  return (
    <section className="bg-green-950 text-white py-16 px-4 sm:px-8 ">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl text-lime-300 font-bold mb-2">Our Impact</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Through our dedicated efforts and your support, we've made significant
          progress in environmental conservation.
        </p>
        <div className="w-20 h-1 bg-lime-300 mt-4 mx-auto rounded-full" />
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
        {[
          {
            value: "5,000+",
            label: "Trees Planted",
            desc: "Native species planted across various regions",
          },
          {
            value: "12",
            label: "Water Bodies Restored",
            desc: "Ponds and lakes revitalized for communities",
          },
          {
            value: "25,000+",
            label: "People Benefited",
            desc: "Through clean water and green spaces",
          },
          {
            value: "30+",
            label: "Schools Engaged",
            desc: "In environmental education programs",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-t from-green-900 to-green-500 rounded-md p-6 text-center border border-green-600 shadow"
          >
            <h3 className="text-3xl font-bold text-white">{item.value}</h3>
            <p className="text-sm font-semibold mt-2 text-green-300">
              {item.label}
            </p>
            <p className="text-xs text-gray-300 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Goals & Assessment */}
      <div className="grid md:grid-cols-2 gap-8 rounded-xl bg-[#09513A] border border-green-600 shadow-lg p-6">
        {/* Sustainable Goals */}
        <div className="rounded-xl p-6 ">
          <h4 className="text-lg font-semibold mb-4 text-lime-300">
            Sustainable Development Goals
          </h4>
          <p className="text-sm text-gray-300 mb-4">
            Our work contributes to multiple UN Sustainable Development Goals,
            creating lasting positive change for communities and ecosystems.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold">
                6
              </span>
              <span className="text-sm">Clean Water and Sanitation</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-green-600 rounded-full px-3 py-1 text-sm font-semibold">
                13
              </span>
              <span className="text-sm">Climate Action</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-lime-600 rounded-full px-3 py-1 text-sm font-semibold">
                15
              </span>
              <span className="text-sm">Life on Land</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-purple-600 rounded-full px-3 py-1 text-sm font-semibold">
                17
              </span>
              <span className="text-sm">Partnerships for the Goals</span>
            </div>
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="bg-[#07583F] rounded-xl p-6 border border-green-600 shadow-lg">
          <h4 className="text-lg font-semibold text-lime-300 mb-4">
            Environmental Impact Assessment
          </h4>
          {[
            { label: "Carbon Sequestration", value: 85 },
            { label: "Water Quality Improvement", value: 92 },
            { label: "Biodiversity Enhancement", value: 78 },
            { label: "Community Engagement", value: 95 },
          ].map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-white">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-green-300">
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
