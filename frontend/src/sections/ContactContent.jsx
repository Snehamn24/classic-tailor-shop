import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

export default function ContactContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      
      <div className="text-center mb-32">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          Contact Us
        </h2>
       
      </div>

     
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
           
            <BsFillTelephoneForwardFill />
            <p className="text-gray-700 text-lg font-medium">
              +91 98765 43210
            </p>
          </div>

          <div className="flex items-center gap-4">
            <IoMdMail />
            
            <p className="text-gray-700 text-lg font-medium">
              classic.tailor@example.com
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <p className="text-gray-700 text-lg">
              Classic Tailor, Bengaluru, Karnataka
            </p>
          </div>
        </div>

        {/* RIGHT: Map Placeholder */}
        <div className="w-full h-[350px] rounded-lg flex items-center justify-center">
          
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0620642444496!2d77.49986227934558!3d13.031719700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cc29b41f08f%3A0x9b7565f24e6e3fc4!2sClassic%20Tailor!5e0!3m2!1sen!2sin!4v1768821047599!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          
        </div>

      </div>
    </div>
  );
}
