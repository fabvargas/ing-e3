import { RoomService } from "@/backend/services/room-service";
import Link from "next/link";
import { redirect } from "next/navigation";

interface RoomsPageProps {
  searchParams: {
    tipoCama?: string;
    fechaInicio?: string;
    fechaTermino?: string;
  };
}

export default async function Page({ searchParams }: RoomsPageProps) {
  const { tipoCama, fechaInicio, fechaTermino } = searchParams;

  console.log(tipoCama, "desde page reservation")

  if (!fechaInicio || !fechaTermino) {
    return <p className="text-center mt-10">Faltan parámetros de búsqueda</p>;
  }

  const tipo = tipoCama === "Individual" || tipoCama === "Doble" ? tipoCama : null;

  const service = new RoomService();
  const availableRooms = await service.findAvailableRooms(
    tipo,
    new Date(fechaInicio),
    new Date(fechaTermino)
  );

  // // Si es Individual, redirigir directamente a la primera habitación Turista Single disponible
  // if (tipo === "Individual" && availableRooms.length > 0) {
  //   const firstRoom = availableRooms[0];
  //   redirect(`/reservation/${firstRoom.id}?fechaInicio=${fechaInicio}&fechaTermino=${fechaTermino}`);
  // }

  // // Si es Individual pero no hay habitaciones disponibles
  // if (tipo === "Individual" && availableRooms.length === 0) {
  //   return (
  //     <div className="my-10 w-full max-w-[1400px] mx-auto text-center">
  //       <h2 className="text-2xl font-medium mb-4">No hay habitaciones individuales disponibles</h2>
  //       <p className="text-gray-500">No se encontraron habitaciones Turista Single disponibles para las fechas seleccionadas.</p>
  //     </div>
  //   );
  // }

  // Para tipo Doble o sin tipo específico, mostrar la grilla normal
  return (
    <div className="my-10 w-full max-w-[1400px] mx-auto">
      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[57px] justify-items-center">
          {availableRooms.map((room) => (
            <div
              key={room.id}
              className="relative w-full max-w-[409px] h-64 md:h-80 lg:h-[325px] rounded-[10px] overflow-hidden group"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8c0efc39214ca6298627cef30a24a4816ba49a09?width=1260"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-10 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-xl md:text-2xl lg:text-[40px] font-medium mb-4 lg:mb-[25px]">
                  {room.categoria}
                </h3>
                <Link 
                href={`/reservation/${room.id}?fechaInicio=${fechaInicio}&fechaTermino=${fechaTermino}`}
                className="w-full max-w-[244px] h-12 md:h-16 lg:h-[76px] bg-primary rounded-[15px] flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl font-medium transition-colors">
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No hay habitaciones disponibles</p>
      )}
    </div>
  );
}
