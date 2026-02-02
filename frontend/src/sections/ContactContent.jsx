import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";


export default function ContactContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Contact Us
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <BsFillTelephoneForwardFill className="text-blue-600 text-xl" />
            <p className="text-gray-700 text-lg font-medium">
              +91 7795196984
            </p>
          </div>

          <div className="flex items-center gap-4">
            <IoMdMail className="text-blue-600 text-xl" />
            <p className="text-gray-700 text-lg font-medium">
              nagarajn2166@gmail.com
            </p>
          </div>

          <div className="flex items-start gap-4">
            <FaLocationDot className="text-blue-600 text-xl mt-1" />
            <p className="text-gray-700 text-lg">
              Classic Tailor, Bengaluru, Karnataka
            </p>
          </div>

          <br></br>

          <div className="flex gap-4 text-xl mt-4 md:mt-0">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     <RiInstagramFill size={28} className="text-blue-600" /> 
                    </a>
          
                    {/* Gmail */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=nagarajn2166@gmail.com"
                      className="hover:text-orange-500"
                    >
                   
                      <MdEmail size={28} className="text-blue-600"/>
                    </a>
                  </div>

        </div>

        {/* RIGHT: Google Map */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0620642444496!2d77.49986227934558!3d13.031719700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cc29b41f08f%3A0x9b7565f24e6e3fc4!2sClassic%20Tailor!5e0!3m2!1sen!2sin!4v1768821047599!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Classic Tailor Location"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
