import { Link as ScrollLink } from "react-scroll";

export default function Footer()
{
    return(
        <footer className="bg-blue-800 text-white py-48 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm mb-4 md:mb-0">
                © Classic Tailor Shop. All rights reserved.
        </p>

        <div className="flex gap-4">
            <ScrollLink 
            to="home"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300"
            >Home</ScrollLink>


            <ScrollLink
            to="about"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300">About Us</ScrollLink>

            <ScrollLink 
            to="service"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300"
            >Service</ScrollLink>

            <ScrollLink 
            to="gallery"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300"
            >Gallery</ScrollLink>


            <ScrollLink 
            to="contact"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300"
            >Contact Us</ScrollLink>



            <ScrollLink 
            to="trackorder"
            smooth={true}
            duration={300}
            className="cursor-pointer hover:text-blue-300"
            >Track Order</ScrollLink>



        </div>



            </div>
        </footer>
    )
}