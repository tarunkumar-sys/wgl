// src/components/Navbar.jsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href) => {
    setMobileDrawerOpen(false);

    if (href.startsWith("#")) {
      const id = href.slice(1);

      if (location.pathname !== "/") {
        navigate("/", { replace: true });
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-green-800 text-white">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10  ml-6 sm:mr-2 scale-[3]"
            />
            {/* <span className="text-xl">World Green Line</span> */}
          </div>

          <ul className="hidden no-cursor lg:flex space-x-6">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-green-300 transition-all"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          <div className="no-cursor hidden lg:block">
            <button
              onClick={() => navigate("/donate")}
              className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
            >
              Donate Us
            </button>
          </div>

          <div className="no-cursor lg:hidden">
            <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="no-cursor lg:hidden mt-4">
            <ul className="flex  flex-col space-y-4">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-lime-300 text-center"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </li>
              ))}
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate("/donate");
                }}
                className="bg-green-600 hover:bg-green-700 mt-4 py-2 px-4 rounded"
              >
                Donate Us
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
