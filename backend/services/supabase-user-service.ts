import { supabase } from '../../lib/supabase'
import { Database } from '../../types/database'

type User = Database['public']['Tables']['usuarios']['Row']
type UserInsert = Database['public']['Tables']['usuarios']['Insert']
type UserUpdate = Database['public']['Tables']['usuarios']['Update']

export class SupabaseUserService {
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error fetching user by email:', error)
      return null
    }

    return data
  }

  async getUserById(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching user by id:', error)
      return null
    }

    return data
  }

  async createUser(userData: Omit<UserInsert, 'id' | 'created_at'>): Promise<User> {
    const { data, error } = await supabase
      .from('usuarios')
      .insert(userData)
      .select()
      .single()

    if (error || !data) {
      console.error('Error creating user:', error)
      throw new Error('Error al crear el usuario')
    }

    return data as User
  }

  async updateUser(id: number, updates: UserUpdate): Promise<User | null> {
    const { data, error } = await supabase
      .from('usuarios')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return null
    }

    return data
  }

  async deleteUser(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting user:', error)
      return false
    }

    return true
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error) {
      console.error('Error validating user:', error)
      return null
    }

    return data
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      throw new Error('Error al obtener los usuarios')
    }

    return data || []
  }
}
