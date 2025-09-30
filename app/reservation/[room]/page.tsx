import { JsonRoomModel } from '@/backend/models/room-model';
import SelectedRoomInfo from '@/pages/component/reserva/SelectedRoomInfo';


import React from 'react'


export default async function Page({ params }: { params: {room: string} }) {

  const path = params.room

  console.log(path)
  
  const roomId = parseInt(path);

  console.log(roomId)

  const model = new JsonRoomModel();


   const room = await model.getRoomById(roomId);
 

  const otherRooms = [
    {
      name: "Suit Premium",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/bd92a580067e86889c4359f9e2af899efe6717f3?width=818"
    },
    {
      name: "Turista Single", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c1e2e992787b261d4200138476177b0a5ca97e53?width=818"
    },
    {
      name: "Turista Doble",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7a5dcd5eae70e2f058dd280e46cccc8e5f6914ed?width=818"
    }
  ];


  return (
    <div className="w-full bg-white font-ubuntu p-8">
        
     <SelectedRoomInfo
     room={room}
     />
     
      {/* Main Content */}
      <main className="px-4 md:px-[60px] pt-8 md:pt-[66px] max-w-[1441px] mx-auto">
        {/* Hero Room Section */}
       

        {/* Other Rooms Section */}
        <section className="mb-16 md:mb-[100px]">
          <h2 className="text-hotel-blue text-2xl md:text-3xl lg:text-[45px] font-medium text-center mb-8 md:mb-[74px]">
            Otras Habitaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[57px] justify-items-center">
            {otherRooms.map((room, index) => (
              <div key={index} className="relative w-full max-w-[409px] h-64 md:h-80 lg:h-[325px] rounded-[10px] overflow-hidden group">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-10 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-xl md:text-2xl lg:text-[40px] font-medium mb-4 lg:mb-[25px]">
                    {room.name}
                  </h3>
                  <button className="w-full max-w-[244px] h-12 md:h-16 lg:h-[76px] bg-primary rounded-[15px] flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl font-medium  transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
