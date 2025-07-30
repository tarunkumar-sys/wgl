import React, { useState, useEffect } from "react";

const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-lime-200 bg-lime-800 bg-opacity-20 rounded-full p-1 mr-3 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const DonatePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presetAmounts = [500, 1000, 5000, 10000];

  useEffect(() => {
    if (isSubmitting) {
      const timer = setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        const resetTimer = setTimeout(() => {
          setIsSubmitted(false);
          setName("");
          setEmail("");
          setAmount(500);
          setCustomAmount("");
        }, 2500);
        return () => clearTimeout(resetTimer);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  const handlePresetClick = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(value)) {
      setAmount(parseInt(value, 10));
    } else if (!value) {
      setAmount(presetAmounts[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting && !isSubmitted) {
      setIsSubmitting(true);
    }
  };

  const whyDonateItems = [
    "Plant trees to fight climate change and improve air quality.",
    "Restore clean water sources in rural communities.",
    "Educate future generations on sustainability.",
    "Create eco-friendly jobs and livelihoods.",
    "Protect wildlife and biodiversity.",
  ];

  const impactItems = [
    { amount: 500, text: "Plants 5 trees" },
    { amount: 1000, text: "Provides clean water for 1 family" },
    { amount: 5000, text: "Funds education for 1 school" },
    { amount: 10000, text: "Restores 1 acre of forest land" },
  ];

  return (
    <div className="min-h-screen p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold  tracking-tight">
            Donate to World Green Line
          </h1>
          <p className="mt-3 text-lg ">
            Support our environmental mission and help build a greener future.
          </p>
          <div className="w-24 h-1 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 bg-green-900 p-6 rounded-2xl shadow-2xl">
          {/* Left Panel */}
          <div className="lg:col-span-2 text-white">
            {" "}
            {/* Added text-white here */}
            <h2 className="text-2xl font-bold mb-4">Why Donate?</h2>
            <ul className="space-y-4 mb-6">
              {whyDonateItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon />
                  <span className="text-white">{item}</span>{" "}
                  {/* Force white text */}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
            <ul className="space-y-3">
              {impactItems.map((item) => (
                <li
                  key={item.amount}
                  className={`flex justify-between p-3 rounded-lg transition-all duration-300 ${
                    amount === item.amount
                      ? "bg-green-800 scale-105"
                      : "bg-green-700 bg-opacity-40"
                  }`}
                >
                  <span className="font-bold text-white">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-white">{item.text}</span>{" "}
                  {/* Changed from green-200 to white */}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-3 bg-white p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presetAmounts.map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handlePresetClick(val)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        amount === val && !customAmount
                          ? "bg-lime-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-lime-500 hover:text-white"
                      }`}
                    >
                      ₹{val.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block mb-1 text-sm font-semibold">
                    Or Custom Amount
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    placeholder="Enter amount"
                    onChange={handleCustomAmountChange}
                    className={`pl-8 pr-4 py-3 rounded-lg font-semibold w-full bg-gray-100 border-2 transition-all duration-300 ${
                      customAmount
                        ? "border-lime-500 bg-white"
                        : "border-gray-200"
                    } focus:border-lime-500 focus:ring-0`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Payment Method
                </label>
                <div className="flex gap-4">
                  {["upi", "bank"].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-3 rounded-lg font-semibold capitalize transition-all duration-300 ${
                        paymentMethod === method
                          ? "bg-lime-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-lime-100"
                      }`}
                    >
                      {method === "upi" ? "UPI" : "Bank Transfer"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 text-xl font-bold text-white rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitted
                    ? "bg-green-500"
                    : isSubmitting
                    ? "bg-orange-500 animate-pulse"
                    : "bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 hover:brightness-110"
                }`}
              >
                {isSubmitting
                  ? "Processing..."
                  : isSubmitted
                  ? "Thank You! ♥"
                  : "Donate Now"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                All donations are tax-deductible under Section 80G.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
