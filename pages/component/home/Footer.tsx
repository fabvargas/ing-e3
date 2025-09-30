
import {  MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
      <footer className="bg-secondary py-20 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo and Contact */}
            <div>
              <div className="bg-white  rounded-xl w-[200px] mb-4">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/23e492025d95d4b487e6a2e957a32f61b1fc32a4?width=334"
                  alt="Hotel Pacific Reef Logo"
                  className="w-32 h-32 mx-auto"
                />
              </div>
              
              <div className="space-y-4 text-white font-ubuntu text-2xl font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 mt-1 opacity-90" />
                  <span>1234 Av. Borgoño, Reñaca</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 opacity-90" />
                  <span>+569 3434 4432</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 opacity-90" />
                  <span>info@hotelpacificreef.com</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-8">
              <div className="space-y-4 text-white font-ubuntu text-2xl">
                <a href="#" className="block hover:opacity-80">Nuestro Hotel</a>
                <a href="#" className="block hover:opacity-80">Galería</a>
                <a href="#" className="block hover:opacity-80">Eventos</a>
                <a href="#" className="block hover:opacity-80">Contáctanos</a>
                <a href="#" className="block hover:opacity-80">Trabaja con Nosotros</a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-ubuntu font-medium text-3xl mb-6">
                Suscríbete para Ofertas
              </h3>
              
              <div className="space-y-4">
                <input 
                  type="email"
                  placeholder="Dirección correo electrónico"
                  className="w-full bg-white px-6 py-4 rounded-xl text-black font-ubuntu text-2xl font-light"
                />
                <button className="w-full bg-primary text-white font-ubuntu font-medium text-2xl px-6 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300">
                  Suscribirse Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
