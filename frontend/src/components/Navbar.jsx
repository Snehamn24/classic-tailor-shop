import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const goAndScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MySPA</h1>

        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <ScrollLink to="home" smooth duration={300}
              onClick={() => goAndScroll("home")}
              className="cursor-pointer hover:text-blue-600">
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="about" smooth duration={300}
              onClick={() => goAndScroll("about")}
              className="cursor-pointer hover:text-blue-600">
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="service" smooth duration={300}
              onClick={() => goAndScroll("service")}
              className="cursor-pointer hover:text-blue-600">
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="gallery" smooth duration={300}
              onClick={() => goAndScroll("gallery")}
              className="cursor-pointer hover:text-blue-600">
              Gallery
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth duration={300}
              onClick={() => goAndScroll("contact")}
              className="cursor-pointer hover:text-blue-600">
              Contact
            </ScrollLink>
          </li>

          <li>
            <ScrollLink to="trackorder" smooth duration={300}
            onClick={() => goAndScroll("trackorder")}
            className="cursor-pointer hover:text-blue-600">
              Track Order
            </ScrollLink>
          </li>
          <li>
            <RouterLink to="/login" className="text-blue-600 hover:underline">
              Login
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
