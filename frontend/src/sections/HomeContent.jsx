import shirt from "../assets/shirt.jpg";
import { useEffect, useRef } from "react";

export default function HomeContent() {
  const imageRef = useRef();

  // simple parallax on mouse move
  useEffect(() => {
    const move = (e) => {
      if (!imageRef.current) return;

      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;

      imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">

      {/* Animated light background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-300/30 blur-[160px] rounded-full top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/30 blur-[160px] rounded-full bottom-1/4 right-1/4 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative max-w-6xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[60vh] animate-fadeIn">

        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden group">
          <img
            ref={imageRef}
            src={shirt}
            alt="Shirt"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left relative">

          {/* floating thread effect */}
          <span className="absolute -top-6 -right-6 w-16 h-16 border-2 border-blue-300 rounded-full animate-spin-slow"></span>

          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3 animate-slideUp">
            Welcome To Classic Tailor
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight animate-slideUp delay-100">
            Tailored To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Perfection
            </span>
          </h2>

          <p className="text-gray-600 mb-8 max-w-md animate-slideUp delay-200">
            Experience premium custom tailoring where every stitch is crafted
            with precision. We design outfits that reflect your personality,
            fit your lifestyle, and elevate your confidence.
          </p>

          <div className="animate-slideUp delay-300">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition">
              Book Appointment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
