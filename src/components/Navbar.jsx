import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/images/logo.svg";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
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
    <nav className="sticky top-0 z-50 py-2 bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-1 relative flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-8 ml-4 sm:mr-2 scale-[3]" />
        </div>

        {/* Desktop Menu */}
       <ul className="hidden lg:flex space-x-4">
      {navItems.map((item, index) => (
        <li key={index} className="relative group">
          <span
            className="cursor-pointer text-base transition-all 
                       hover:text-green-300 relative
                       after:content-[''] after:absolute after:bottom-0 after:left-0 
                       after:w-0 after:h-[2px] after:bg-green-300
                       after:transition-all after:duration-300
                       hover:after:w-full
                       hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" // Glow effect
            onClick={() => !item.subMenu && handleNavClick(item.href)}
          >
            {item.label}
          </span>
          {item.subMenu && (
            <ul className="absolute left-0 mt-2 bg-white text-green-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[150px]">
              {item.subMenu.map((subItem, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer
                             transition-all hover:drop-shadow-[0_0_4px_rgba(74,222,128,0.4)]"
                  onClick={() => handleNavClick(subItem.href)}
                >
                  {subItem.label}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>

    {/* Mobile Menu Icon */}
    <div className="lg:hidden">
      <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}>
        {mobileDrawerOpen ? <X /> : <Menu />}
      </button>
    </div>
  </div>

  {/* Mobile Drawer - Added hover effects */}
  <div className={`fixed top-0 right-0 h-full w-64 bg-green-900 text-white shadow-2xl transform ${
    mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-300 lg:hidden`}>
    <div className="flex justify-between items-center p-4 border-b border-green-700">
      <span className="text-lg font-semibold">Menu</span>
      <button onClick={() => setMobileDrawerOpen(false)}>
        <X />
      </button>
    </div>
    <ul className="flex flex-col p-4 space-y-4">
      {navItems.map((item, index) => (
        <li key={index}>
          {!item.subMenu ? (
            <span
              className="cursor-pointer hover:text-lime-300 block text-left
                         relative pb-1
                         after:content-[''] after:absolute after:bottom-0 after:left-0 
                         after:w-0 after:h-[2px] after:bg-lime-300
                         after:transition-all after:duration-300
                         hover:after:w-full
                         hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]"
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </span>
          ) : (
            <>
              <div
                className="flex justify-between items-center cursor-pointer 
                           hover:text-lime-300 relative pb-1
                           after:content-[''] after:absolute after:bottom-0 after:left-0 
                           after:w-0 after:h-[2px] after:bg-lime-300
                           after:transition-all after:duration-300
                           hover:after:w-full
                           hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]"
                onClick={() =>
                  setOpenSubMenu(openSubMenu === index ? null : index)
                }
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`transform transition-transform ${
                    openSubMenu === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openSubMenu === index && (
                <ul className="ml-4 mt-2 space-y-2">
                  {item.subMenu.map((subItem, i) => (
                    <li
                      key={i}
                      className="cursor-pointer hover:text-lime-300 pl-2
                                 relative pb-1
                                 after:content-[''] after:absolute after:bottom-0 after:left-0 
                                 after:w-0 after:h-[1px] after:bg-lime-300
                                 after:transition-all after:duration-300
                                 hover:after:w-full
                                 hover:drop-shadow-[0_0_4px_rgba(163,230,53,0.4)]"
                      onClick={() => handleNavClick(subItem.href)}
                    >
                      {subItem.label}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
