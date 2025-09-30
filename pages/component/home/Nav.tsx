import React from 'react'

export default function Nav() {
  return (
 
      <header className="relative bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/4f40096060ae0d1de8ce199e80dac7efdcb1cf02?width=404" 
                alt="Hotel Pacific Reef Logo" 
                className="h-14 w-auto"
              />
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <a href="#" className="text-coral font-ubuntu text-2xl font-medium hover:opacity-80">
                Nuestro Hotel
              </a>
              <a href="#" className="text-coral font-ubuntu text-2xl font-medium hover:opacity-80">
                Habitaciones
              </a>
              <a href="#" className="text-coral font-ubuntu text-2xl font-medium hover:opacity-80">
                Servicios
              </a>
              <a href="#" className="text-coral font-ubuntu text-2xl font-medium hover:opacity-80">
                Iniciar Sesión
              </a>
            </nav>
          </div>
        </div>
      </header>
  )
}
