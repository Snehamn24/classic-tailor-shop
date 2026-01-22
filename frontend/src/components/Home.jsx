import HomeContent from "../sections/HomeContent";
import AboutContent from "../sections/AboutContent";
import ServiceContent from "../sections/ServicesContent";
import GalleryContent from "../sections/GalleryContent";
import ContactContent from "../sections/ContactContent";
import TrackOrder from "../sections/TrackOrder";
import Footer from "../sections/Footer";

export default function Home()
{
    return(
        <div className="flex flex-col min-h-screen">

        <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen">
          <HomeContent />
        </div>
      </section>

         {/* ABOUT */}
      <section id="about" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutContent />
        </div>
      </section>

      {/* SERVICES */}
      <section id="service" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceContent />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryContent />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactContent />
        </div>
      </section>

      {/* TRACK ORDER */}
      <section id="trackorder" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrackOrder />
        </div>
      </section>


      <section id="footer" className="bg-blue-50">
       
        <div className="py-16 pb-0">
          <Footer />
        </div>
      </section>



        </div>
    )
}