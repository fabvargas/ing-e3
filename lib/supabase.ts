import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zrpegwzdkmylixyzzfyh.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycGVnd3pka215bGl4eXp6ZnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2OTQ4NTEsImV4cCI6MjA3NTI3MDg1MX0.md7IlbHvC0ny2kRutqn1haz3qATdAsh8fSZVi_LZcW8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para operaciones del servidor (con más permisos)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycGVnd3pka215bGl4eXp6ZnloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTY5NDg1MSwiZXhwIjoyMDc1MjcwODUxfQ.76lmQuuFo7WOhe4j_O5wc8snPO2xoMI8xQgeVf7AFhM'
)
