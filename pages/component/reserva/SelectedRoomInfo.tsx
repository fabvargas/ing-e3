"use client"
// Componente cliente: muestra la información seleccionada de una habitación
// y permite navegar a la pantalla de resumen/carrito.
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Wifi, Tv, Star } from "lucide-react";
import { Database } from '@/types/database';
import { useRouter, useSearchParams } from 'next/navigation'

type Room = Database['public']['Tables']['habitaciones']['Row']

export default function SelectedRoomInfo({room}:{room:Room}) {


/* Función para calcular la diferencia en días entre dos fechas */
  const router = useRouter()
  const searchParams = useSearchParams()
  console.log(searchParams , "search paramd from selected room")
  const fechaInicio = searchParams?.get('fechaInicio')
  console.log(fechaInicio, "from slected room")
  const fechaTermino = searchParams?.get('fechaTermino')
    const [current, setCurrent] = useState(0)

    const roomImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/8ccd5129669f5284f823a95550463369243d2667?width=1260",
    "https://api.builder.io/api/v1/image/assets/TEMP/bd617101f0cf4232a0a27a5b080541ffbd46955a?width=310",
    "https://api.builder.io/api/v1/image/assets/TEMP/3fd8c61c496b89a6f13acfc306111b83f639b997?width=310",
    "https://api.builder.io/api/v1/image/assets/TEMP/fca2e25798bc7ad0a3810a4405765635d4b0678d?width=310"
  ];
  // Funciones para navegar el carrusel: previa y siguiente
  const prev = () => setCurrent((c) => (c === 0 ? roomImages.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === roomImages.length - 1 ? 0 : c + 1))

  return (
    <div className='flex flex-col w-full max-w-[1300px] m-auto mt-10'>
     <section className="flex flex-col lg:flex-row gap-8 lg:gap-[56px] mb-16 lg:mb-[200px]">
          {/* Image Gallery */}
          <div className="flex-1">
            <img
              src={roomImages[current]}
              alt="Hotel Room"
              className="w-full max-w-[630px] h-64 md:h-80 lg:h-[500px] rounded-[10px] object-cover mx-auto"
            />

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-2 md:gap-[15px] mt-4 md:mt-[31px] justify-center">
              <button
                onClick={prev}
                className="w-8 h-8 md:w-12 md:h-12 text-hotel-blue/70 hover:text-hotel-blue transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-full h-full" strokeWidth={1} />
              </button>

              <div className="flex gap-2 md:gap-[19px] overflow-x-auto">
                {roomImages.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Room view ${index + 1}`}
                    onClick={() => setCurrent(index)}
                    className="w-20 h-14 md:w-[155px] md:h-[103px] rounded-[10px] object-cover cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                  />
                ))}
              </div>

              <button
                /* Función para cambiar la imagen actual en el carrusel */
                onClick={next}
                className="w-8 h-8 md:w-12 md:h-12 text-hotel-blue/70 hover:text-hotel-blue transition-colors flex-shrink-0"
              >
                <ChevronRight className="w-full h-full" strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Room Details */}
          <div className="flex-1 pt-4 lg:pt-[23px]">
            <h1 className="text-hotel-blue text-2xl md:text-3xl lg:text-[40px] font-medium mb-3">
              {room.categoria}
            </h1>
            <p className="text-hotel-blue text-xl md:text-2xl lg:text-[35px] font-medium mb-6 lg:mb-[38px]">
              ${room.precio_diario} por noche
            </p>
            <p className="text-hotel-blue text-lg md:text-xl lg:text-[29px] font-normal leading-[1.4] mb-8 lg:mb-[53px]">
             {room.descripcion}
            </p>
            <button 
            // Al presionar Reservar: construimos una query string con las fechas
            // si están presentes y redirigimos a la página /reservation/cart
            onClick={()=> {
              const parts: string[] = []
              if (fechaInicio) parts.push(`fechaInicio=${fechaInicio}`)
              if (fechaTermino) parts.push(`fechaTermino=${fechaTermino}`)
              const qs = parts.length ? `&${parts.join('&')}` : ''
              router.push(`/reservation/cart?roomId=${room.id}${qs}`)
            }}
            className="w-full bg-primary border-0 max-w-[244px] h-16 lg:h-[76px] rounded-[15px] flex items-center justify-center text-white text-xl lg:text-[30px] font-medium hover:bg-hotel-orange/90 transition-colors">
              Reservar
            </button>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="bg-tertiary rounded-[15px] px-4 md:px-[76px] py-6 md:py-[37px] mb-16 md:mb-[180px]">
          <h2 className="text-hotel-blue text-2xl md:text-3xl lg:text-[45px] font-medium text-center mb-8 md:mb-[80px]">
            Comodidades
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            <div className="flex flex-col items-center gap-2">
              <Wifi className="w-8 h-8 md:w-12 md:h-12 text-hotel-blue" />
              <span className="text-hotel-blue text-lg md:text-xl lg:text-[29px] font-normal text-center">
                Wifi gratuito
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Tv className="w-8 h-8 md:w-12 md:h-12 text-hotel-blue" />
              <span className="text-hotel-blue text-lg md:text-xl lg:text-[29px] font-normal text-center">
                Tv cable
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Star className="w-8 h-8 md:w-12 md:h-12 text-hotel-blue" />
              <span className="text-hotel-blue text-lg md:text-xl lg:text-[29px] font-normal text-center">
                Estación de Café y Té
              </span>
            </div>
          </div>
        </section>

    </div>
  )
}
