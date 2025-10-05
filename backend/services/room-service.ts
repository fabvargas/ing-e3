import { JsonRoomModel, Room } from "../models/room-model";
import { JsonReservationModel } from "../models/reservation-model";
import { soloFechaChile } from "../utils/fechaChiile";

export class RoomService {
  private roomModel: JsonRoomModel;
  private reservationModel: JsonReservationModel;

  constructor() {
    this.roomModel = new JsonRoomModel();
    this.reservationModel = new JsonReservationModel();
  }

  
  async findAvailableRooms(
    categoria: "Suit Premium" | "Turista Single" | "Turista Vista al Mar" | "Turista Doble" | null,
    fechaInicio: Date,
    fechaTermino: Date
  ): Promise<Room[]> {
  


const hoyFecha = soloFechaChile(new Date());
const inicioFecha = soloFechaChile(fechaInicio);
const terminoFecha = soloFechaChile(fechaTermino);

if (inicioFecha < hoyFecha || terminoFecha < inicioFecha) {
  console.log("Fechas inválidas:", inicioFecha, terminoFecha, hoyFecha);
  return [];
}
 console.log(inicioFecha,terminoFecha,hoyFecha)

    const rooms = await this.roomModel.getAllRooms();
    const reservations = await this.reservationModel.getAllReservations();

    // 1. filtrar por categoria
    const filteredRooms = categoria
      ? rooms.filter((room) => room.categoria === categoria)
      : rooms;

    // 2. conflicto de fechas
    const availableRooms = filteredRooms.filter((room) => {
      const reservasDeRoom = reservations.filter(
        (res) => res.roomId === room.id
      );

    
     const tieneConflicto = reservasDeRoom.some((res) => {
  const resInicio = soloFechaChile(new Date(res.fechaInicio));
  const resTermino = soloFechaChile(new Date(res.fechaTermino));
  return inicioFecha <= resTermino && terminoFecha >= resInicio;
});


      return !tieneConflicto;
    });
   
    return availableRooms;
  }
}
