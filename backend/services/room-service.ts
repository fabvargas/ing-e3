import { SupabaseRoomService } from "./supabase-room-service";
import { SupabaseReservationService } from "./supabase-reservation-service";
import { soloFechaChile } from "../utils/fechaChiile";

export class RoomService {
  private roomModel: SupabaseRoomService;
  private reservationModel: SupabaseReservationService;

  constructor() {
    this.roomModel = new SupabaseRoomService();
    this.reservationModel = new SupabaseReservationService();
  }

  
  async findAvailableRooms(
    tipoCama: "Individual" | "Doble" | null,
    fechaInicio: Date,
    fechaTermino: Date
  ) {
  

const hoyFecha = soloFechaChile(new Date());
const inicioFecha = soloFechaChile(fechaInicio);
const terminoFecha = soloFechaChile(fechaTermino);

if (inicioFecha < hoyFecha || terminoFecha < inicioFecha) {
  console.log("Fechas inválidas:", inicioFecha, terminoFecha, hoyFecha);
  return [];
}
 console.log(inicioFecha,terminoFecha,hoyFecha)

    // Usar el método de Supabase que ya maneja la lógica de disponibilidad
    const availableRooms = await this.roomModel.getAvailableRooms(
      inicioFecha.toISOString().split('T')[0],
      terminoFecha.toISOString().split('T')[0]
    );

    // Si es Individual, devolver solo Turista Single
    if (tipoCama === "Individual") {
      const filteredRooms = availableRooms.filter((room) => room.tipo_cama === "Individual");
      return filteredRooms.filter((room) => room.categoria === "Turista Single");
    }

    // Si es Doble, devolver máximo 1 habitación por categoría de tipo doble
    if (tipoCama === "Doble") {
      const filteredRooms = availableRooms.filter((room) => room.tipo_cama === "Doble");
      const categories = ["Turista Doble", "Turista Vista al Mar", "Suit Premium"];
      const result: typeof filteredRooms = [];
      
      for (const category of categories) {
        const roomInCategory = filteredRooms.find((room) => room.categoria === category);
        if (roomInCategory) {
          result.push(roomInCategory);
        }
      }
      
      return result;
    }

    // Si no se especifica tipo de cama, mostrar máximo 1 habitación por cada categoría disponible
    const allCategories = ["Turista Single", "Turista Doble", "Turista Vista al Mar", "Suit Premium"];
    const result: typeof availableRooms = [];
    
    for (const category of allCategories) {
      const roomInCategory = availableRooms.find((room) => room.categoria === category);
      if (roomInCategory) {
        result.push(roomInCategory);
      }
    }
    
    return result;
  }
}