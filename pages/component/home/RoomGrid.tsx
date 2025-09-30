import React from 'react'

export default function RoomGrid() {
  const otherRooms = [
    {
      name: "Suit Premium",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/bd92a580067e86889c4359f9e2af899efe6717f3?width=818",
      
    },
    {
      name: "Turista Single", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c1e2e992787b261d4200138476177b0a5ca97e53?width=818",
    
    },
    {
      name: "Turista Doble",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/90ddde204fbd2d128ef8a7a8ef1a3cdb53506893?width=1260",
     
    },
    {
      name: "Turista Vista al Mar",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7a5dcd5eae70e2f058dd280e46cccc8e5f6914ed?width=818",
     
    }
  ];

  return (
    <section className="py-20 bg-white mt-38">
      <div className="container mx-auto px-4">
        <h2 className="text-coral font-ubuntu font-medium text-5xl text-center mb-16">
          Nuestras Habitaciones
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {otherRooms.map((room, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden">
              <img 
                src={room.image}
                alt={room.name}
                className="w-full h-[500px] object-cover"
              />
              <div className={`absolute inset-0 flex flex-col justify-end p-8`}>
                <h3 className="text-white font-ubuntu font-medium text-4xl mb-4">
                  {room.name}
                </h3>
                <button className= "bg-primary text-white font-ubuntu font-medium text-2xl px-12 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 self-start">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
