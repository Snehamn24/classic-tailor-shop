import { motion } from "framer-motion";
import hero from "../assets/shirt1.webp"; // make sure image name is correct
import "./Home.css";    // adjust path if needed

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div 
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 hero-enter max-w-4xl px-16 text-white"
      >
        <p className="italic text-xl mb-3 opacity-80">
          The Difference of Made-To-Measure
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          WHY MADE-TO-MEASURE?
        </h1>

        <p className="mt-6 text-gray-200 max-w-xl">
          Because the best compliments come from wearing something made for you.
          Tailored comfort. Effortless style. Lasting quality.
        </p>

        <h3 className="mt-10 text-xl font-semibold">
          OUR REMAKE GUARANTEE
        </h3>

        <p className="text-gray-300 mt-3 max-w-xl">
          If your first stitch isn’t perfect, we’ll remake it at no cost.
        </p>

        <button className="mt-10 border border-white px-10 py-3 tracking-widest glow-on-hover">
        VISIT US TODAY
        </button>
      </motion.div>
    </section>
  );
}
