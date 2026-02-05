import Hero from "../sections/Hero";
import AboutContent from "../sections/AboutContent";
import ServiceContent from "../sections/ServicesContent";
import GalleryContent from "../sections/GalleryContent";
import ContactContent from "../sections/ContactContent";
import TrackOrder from "../sections/TrackOrder";
import Footer from "../sections/Footer";
import FAQ from "../sections/FAQ";

export default function Home() {
  return (
    <main id="home" className="w-full overflow-x-hidden">

      {/* HERO */}
      <section className="min-h-screen w-full relative">
        <Hero />
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#071525]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <AboutContent />
        </div>
      </section>

      {/* SERVICES */}
      <section id="service" className="bg-[#071525]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ServiceContent />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#071525]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <FAQ />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#071525]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <GalleryContent />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#071525]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ContactContent />
        </div>
      </section>

      {/* TRACK ORDER */}
      <TrackOrder />  {/* <-- no extra wrapper, TrackOrder handles full width & gradient */}

      {/* FOOTER */}
      <footer className="bg-[#071525]">
        <Footer />
      </footer>

    </main>
  );
}
