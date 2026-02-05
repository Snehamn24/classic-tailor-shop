import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import scissors from "../assets/opening.gif";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goAndScroll = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const navItem = (label, id) => (
    <ScrollLink
      to={id}
      smooth
      duration={300}
      offset={-120}
      onClick={() => goAndScroll(id)}
      className="
        relative cursor-pointer px-3 py-2 text-sm font-medium
        text-gray-200 transition-all duration-300
        hover:text-blue-400
        after:absolute after:left-1/2 after:-bottom-1
        after:h-[2px] after:w-0 after:bg-blue-400
        after:transition-all after:duration-300
        hover:after:w-full hover:after:left-0
      "
    >
      {label}
    </ScrollLink>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* NAV BAR */}
      <div className="backdrop-blur-xl bg-[#0b1c2d]/90 border-b border-blue-900/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={scissors}
              alt="logo"
              className="h-11 w-11 object-contain"
            />
            <div className="leading-tight">
              <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
                Classic Tailor
              </h1>
              <p className="text-[11px] tracking-wider text-gray-400 uppercase">
                Perfect Fit Specialists
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <li>{navItem("Home", "home")}</li>
            <li>{navItem("About", "about")}</li>
            <li>{navItem("Services", "service")}</li>
            <li>{navItem("FAQ", "faq")}</li>
            <li>{navItem("Gallery", "gallery")}</li>
            <li>{navItem("Contact", "contact")}</li>
            <li>{navItem("Track Order", "trackorder")}</li>

            {/* Login */}
            <li>
              <RouterLink
                to="/login"
                className="
                  ml-4 px-6 py-2.5 rounded-full text-sm font-semibold
                  text-white bg-blue-600
                  shadow-md shadow-blue-600/30
                  hover:bg-blue-700 hover:shadow-lg
                  transition-all duration-300
                "
              >
                Login
              </RouterLink>
            </li>
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0b1c2d]/95 backdrop-blur-xl shadow-xl border-t border-blue-900">
          <ul className="flex flex-col gap-4 px-6 py-8 text-gray-200">

            <li>{navItem("Home", "home")}</li>
            <li>{navItem("About", "about")}</li>
            <li>{navItem("Services", "service")}</li>
            <li>{navItem("FAQ", "faq")}</li>
            <li>{navItem("Gallery", "gallery")}</li>
            <li>{navItem("Contact", "contact")}</li>
            <li>{navItem("Track Order", "trackorder")}</li>

            <RouterLink
              to="/login"
              onClick={() => setOpen(false)}
              className="
                mt-6 text-center py-3 rounded-full
                bg-blue-600 text-white font-semibold
                shadow-md hover:bg-blue-700 transition
              "
            >
              Login
            </RouterLink>

          </ul>
        </div>
      )}
    </nav>
  );
}
