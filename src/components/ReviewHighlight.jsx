import React from "react";

const reviews = [
  {
    text: "Andrew was amazing. Been fighting for disability for years and he got it done with back pay in a couple months.",
    name: "Jerad Brannen",
    avatar: "/avatars/user1.jpg",
  },
  {
    text: "Andrew made the process of filing my claim extremely easy and gave me the confidence to follow through and get it approved. Semper Fi!",
    name: "Armando Aceves",
    avatar: "/avatars/user2.jpg",
  },
];

const ReviewHighlight = () => {
  return (
    <section className="w-full">
  

      {/* === Review Cards Section === */}
      <div className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg font-semibold mb-10">Reviews From Facebook</p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-emerald-800 shadow-md p-6 rounded-xl max-w-sm text-center hover:border-green-400 border-2 border-transparent transition-all duration-300"
              >
                <div className="text-3xl mb-4">“</div>
                <p className="text-white text-base leading-relaxed mb-6 font-medium">
                  {rev.text}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="font-semibold">{rev.name}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewHighlight;
