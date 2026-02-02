import { Link as ScrollLink } from "react-scroll";
import { RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function Footer()
{
    return(
        <footer className="bg-blue-800 text-white py-48 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm mb-4 md:mb-0">
                &copy; Classic Tailor Shop. All rights reserved.
        </p>

        <div className="flex gap-4">
            <ScrollLink 
            to="home"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500"
            >Home</ScrollLink>


            <ScrollLink
            to="about"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500">About Us</ScrollLink>

            <ScrollLink 
            to="service"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500"
            >Service</ScrollLink>

            <ScrollLink 
            to="gallery"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500"
            >Gallery</ScrollLink>


            <ScrollLink 
            to="contact"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500"
            >Contact Us</ScrollLink>



            <ScrollLink 
            to="trackorder"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-orange-500"
            >Track Order</ScrollLink>



        </div>

             <div className="flex gap-4 text-xl mt-4 md:mt-0">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/classic_mens_tailoring"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
           <RiInstagramFill size={28} /> 
          </a>

          {/* Gmail */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=nagarajn2166@gmail.com"
            className="hover:text-orange-500"
          >
         
            <MdEmail size={28} />
          </a>
        </div>



            </div>
        </footer>
    )
}