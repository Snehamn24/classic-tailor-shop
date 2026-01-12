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

        <section id="home" className="h-screen flex items-center justify-center bg-blue-50">
            <HomeContent />
        </section>

         <section id="about" className="h-screen flex items-center justify-center bg-blue-50">
        <AboutContent />
      </section>

         <section id="service" className="h-screen flex items-center justify-center bg-blue-50">
        <ServiceContent />
      </section>

       <section id="gallery" className="h-screen flex items-center justify-center bg-blue-50">
        <GalleryContent/>
      </section>

       <section id="contact" className="h-screen flex items-center justify-center bg-blue-50">
        <ContactContent />
      </section>

      <section id="trackorder" className="h-screen flex items-center justify-center bg-blue-50">
        <TrackOrder />
      </section>


      <section id="footer" className="bg-blue-50">
        <Footer />
      </section>



        </div>
    )
}