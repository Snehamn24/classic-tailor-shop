import shirt from "../assets/shirt.jpg";
export default function HomeContent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full h-[60vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image section */}
        <div>
          <img
            src={shirt}
            alt="Shirt image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center text-center md:text-left">
          <p className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-2">
            Welcome To Classic Tailor
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tailored To <span className="text-blue-600">Perfection</span>
          </h2>
          <p className="text-gray-600 mb-6">
             Experience premium custom tailoring where every stitch is crafted with precision.
            At Classic Tailor, we design outfits that reflect your personality, fit your lifestyle,
            and elevate your confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
