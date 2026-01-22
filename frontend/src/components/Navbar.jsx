import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import  scissors  from "../assets/opening.gif";

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
      offset={-80}
      onClick={() => goAndScroll(id)}
      className="cursor-pointer hover:text-blue-600"
    >
      {label}
    </ScrollLink>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
<div className="flex items-center gap-2">
  <img src={scissors} className="h-10 w-10" alt="Scissors Logo" />
  <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
    Classic Tailor
  </h1>
</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>{navItem("Home", "home")}</li>
          <li>{navItem("About", "about")}</li>
          <li>{navItem("Services", "service")}</li>
          <li>{navItem("Gallery", "gallery")}</li>
          <li>{navItem("Contact", "contact")}</li>
          <li>{navItem("Track Order", "trackorder")}</li>
          <li>
            <RouterLink to="/login" className="text-blue-600 hover:underline">
              Login
            </RouterLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
            <li>{navItem("Home", "home")}</li>
            <li>{navItem("About", "about")}</li>
            <li>{navItem("Services", "service")}</li>
            <li>{navItem("Gallery", "gallery")}</li>
            <li>{navItem("Contact", "contact")}</li>
            <li>{navItem("Track Order", "trackorder")}</li>
            <li>
              <RouterLink
                to="/login"
                onClick={() => setOpen(false)}
                className="text-blue-600"
              >
                Login
              </RouterLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
