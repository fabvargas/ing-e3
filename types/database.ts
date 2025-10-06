export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: number
          name: string
          email: string
          password: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          password: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          password?: string
        }
      }
      habitaciones: {
        Row: {
          id: number
          numero: number
          categoria: 'Suit Premium' | 'Turista Single' | 'Turista Vista al Mar' | 'Turista Doble'
          piso: number
          precio_diario: number
          tipo_cama: 'Individual' | 'Doble'
          descripcion: string
        }
        Insert: {
          id?: number
          numero: number
          categoria: 'Suit Premium' | 'Turista Single' | 'Turista Vista al Mar' | 'Turista Doble'
          piso: number
          precio_diario: number
          tipo_cama: 'Individual' | 'Doble'
          descripcion: string
        }
        Update: {
          id?: number
          numero?: number
          categoria?: 'Suit Premium' | 'Turista Single' | 'Turista Vista al Mar' | 'Turista Doble'
          piso?: number
          precio_diario?: number
          tipo_cama?: 'Individual' | 'Doble'
          descripcion?: string
        }
      }
      reservas: {
        Row: {
          id: number
          room_id: number
          usuario_id?: number
          fecha_inicio: string
          fecha_termino: string
          estado?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
          created_at?: string
        }
        Insert: {
          id?: number
          room_id: number
          usuario_id?: number
          fecha_inicio: string
          fecha_termino: string
          estado?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
          created_at?: string
        }
        Update: {
          id?: number
          room_id?: number
          usuario_id?: number
          fecha_inicio?: string
          fecha_termino?: string
          estado?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
          created_at?: string
        }
      }
    }
  }
}
