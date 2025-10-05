import { JsonRoomModel } from '@/backend/models/room-model'
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
  const model = new JsonRoomModel() /*Crear una instancia del modelo de habitaciones (JsonRoomModel)*/
  const room = await model.getRoomById(roomId) /*Buscar la habitación por su id (getRoomById)*/

  /*Si no se encuentra la habitación RETORNA EL MENSAJE: "Habitación no encontrada."*/
  return (
    <div className="py-10">
      <CartSummary room={room} />
    </div>
  )
}
