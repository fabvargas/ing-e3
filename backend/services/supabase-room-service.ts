import { supabase } from '../../lib/supabase'
import { Database } from '../../types/database'

type Room = Database['public']['Tables']['habitaciones']['Row']

export class SupabaseRoomService {
  async getAllRooms(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .order('id')

    if (error) {
      console.error('Error fetching rooms:', error)
      throw new Error('Error al obtener las habitaciones')
    }

    return data || []
  }

  async getRoomById(id: number): Promise<Room | null> {
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching room:', error)
      return null
    }

    return data
  }

  async getAvailableRooms(fechaInicio?: string, fechaTermino?: string): Promise<Room[]> {
    let query = supabase
      .from('habitaciones')
      .select('*')
      .order('id')

    // Si se proporcionan fechas, filtrar habitaciones disponibles en ese período
    if (fechaInicio && fechaTermino) {
      const { data: habitacionesOcupadas, error: ocupadasError } = await supabase
        .from('reservas')
        .select('room_id')
        .or(`and(fecha_inicio.lte.${fechaTermino},fecha_termino.gte.${fechaInicio})`)

      if (ocupadasError) {
        console.error('Error checking occupied rooms:', ocupadasError)
        throw new Error('Error al verificar disponibilidad')
      }

      const habitacionesOcupadasIds = habitacionesOcupadas?.map(r => r.room_id) || []
      
      if (habitacionesOcupadasIds.length > 0) {
        query = query.not('id', 'in', `(${habitacionesOcupadasIds.join(',')})`)
      }
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching available rooms:', error)
      throw new Error('Error al obtener habitaciones disponibles')
    }

    return data || []
  }

  async addRoom(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
    const { data, error } = await supabase
      .from('habitaciones')
      .insert(room)
      .select()
      .single()

    if (error) {
      console.error('Error adding room:', error)
      throw new Error('Error al agregar la habitación')
    }

    return data
  }

  async updateRoom(id: number, updates: Partial<Omit<Room, 'id' | 'created_at'>>): Promise<Room | null> {
    const { data, error } = await supabase
      .from('habitaciones')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating room:', error)
      return null
    }

    return data
  }

  async deleteRoom(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('habitaciones')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting room:', error)
      return false
    }

    return true
  }

  async updateRoomAvailability(id: number, disponible: boolean): Promise<Room | null> {
    return this.updateRoom(id, { disponible })
  }
}
