import { supabase } from '../../lib/supabase'
import { Database } from '../../types/database'

type Reservation = Database['public']['Tables']['reservas']['Row']
type ReservationInsert = Database['public']['Tables']['reservas']['Insert']
type ReservationUpdate = Database['public']['Tables']['reservas']['Update']

export class SupabaseReservationService {
  async createReservation(reservationData: Omit<ReservationInsert, 'id' | 'created_at'>): Promise<Reservation> {
    const { data, error } = await supabase
      .from('reservas')
      .insert({
        room_id: reservationData.room_id,
        usuario_id: reservationData.usuario_id,
        fecha_inicio: reservationData.fecha_inicio,
        fecha_termino: reservationData.fecha_termino,
        estado: reservationData.estado || 'confirmada'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating reservation:', error)
      throw new Error('Error al crear la reserva')
    }

    return data
  }

  async getReservationById(id: number): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching reservation:', error)
      return null
    }

    return data
  }

  async getReservationsByUser(userId: number): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('usuario_id', userId)
      .order('fecha_inicio', { ascending: false })

    if (error) {
      console.error('Error fetching user reservations:', error)
      throw new Error('Error al obtener las reservas del usuario')
    }

    return data || []
  }

  async getReservationsByRoom(roomId: number): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('room_id', roomId)
      .order('fecha_inicio', { ascending: false })

    if (error) {
      console.error('Error fetching room reservations:', error)
      throw new Error('Error al obtener las reservas de la habitación')
    }

    return data || []
  }

  async updateReservation(id: number, updates: ReservationUpdate): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating reservation:', error)
      return null
    }

    return data
  }

  async cancelReservation(id: number): Promise<Reservation | null> {
    return this.updateReservation(id, { estado: 'cancelada' })
  }

  async confirmReservation(id: number): Promise<Reservation | null> {
    return this.updateReservation(id, { estado: 'confirmada' })
  }

  async completeReservation(id: number): Promise<Reservation | null> {
    return this.updateReservation(id, { estado: 'completada' })
  }

  async deleteReservation(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('reservas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting reservation:', error)
      return false
    }

    return true
  }

  async getAllReservations(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha_inicio', { ascending: false })

    if (error) {
      console.error('Error fetching all reservations:', error)
      throw new Error('Error al obtener todas las reservas')
    }

    return data || []
  }

  async getReservationsInDateRange(fechaInicio: string, fechaTermino: string): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .or(`and(fecha_inicio.lte.${fechaTermino},fecha_termino.gte.${fechaInicio})`)
      .order('fecha_inicio')

    if (error) {
      console.error('Error fetching reservations in date range:', error)
      throw new Error('Error al obtener reservas en el rango de fechas')
    }

    return data || []
  }

  async checkRoomAvailability(roomId: number, fechaInicio: string, fechaTermino: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('reservas')
      .select('id')
      .eq('room_id', roomId)
      .or(`and(fecha_inicio.lte.${fechaTermino},fecha_termino.gte.${fechaInicio})`)
      .limit(1)

    if (error) {
      console.error('Error checking room availability:', error)
      throw new Error('Error al verificar disponibilidad de la habitación')
    }

    return !data || data.length === 0
  }
}
