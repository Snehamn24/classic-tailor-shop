import HomeContent from "../sections/HomeContent";
import AboutContent from "../sections/AboutContent";
import ServiceContent from "../sections/ServicesContent";
import GalleryContent from "../sections/GalleryContent";
import ContactContent from "../sections/ContactContent";

export default function Home()
{
    return(
        <div className="space-y-32">

        <section id="home" className="min-h-screen flex items-center justify-center bg-blue-50">
            <HomeContent />
        </section>

         <section id="about" className="min-h-screen flex items-center justify-center bg-blue-50">
        <AboutContent />
      </section>

         <section id="service" className="min-h-screen flex items-center justify-center bg-blue-50">
        <ServiceContent />
      </section>

       <section id="gallery" className="min-h-screen flex items-center justify-center bg-blue-50">
        <GalleryContent/>
      </section>

       <section id="contact" className="min-h-screen flex items-center justify-center bg-blue-50">
        <ContactContent />
      </section>



        </div>
    )
}