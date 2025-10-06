import { SupabaseRoomService } from '@/backend/services/supabase-room-service'
import CartSummary from './CartSummary'

  /*
Se lee de la URL el parámetro llamado roomId.
Si no viene roomId, se muestra un mensaje: "No se seleccionó ninguna habitación."
  */
export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
  const roomIdParam = searchParams?.roomId as string | undefined
  if (!roomIdParam) {
    return <p className="text-center mt-10">No se seleccionó ninguna habitación.</p>
  }


  const roomId = parseInt(roomIdParam) /*Convertir el id (texto - roomIdParam) de la habitación a número (parseInt)*/
  const roomService = new SupabaseRoomService() /*Crear una instancia del servicio de habitaciones (SupabaseRoomService)*/
  const room = await roomService.getRoomById(roomId) /*Buscar la habitación por su id (getRoomById)*/

  /*Si no se encuentra la habitación RETORNA EL MENSAJE: "Habitación no encontrada."*/
  if (!room) {
    return <p className="text-center mt-10">Habitación no encontrada.</p>
  }
  return (
    <div className="py-10">
      <CartSummary room={room} />
    </div>
  )
}
