import { supabaseAdmin } from '../lib/supabase'

// Datos actualizados con categorías simplificadas
const habitacionesData = [
  {
    numero: 10,
    categoria: "Turista Single" as const,
    piso: 1,
    precio_diario: 40000,
    descripcion: "Habitación cómoda para una persona, con baño privado y WiFi."
  },
  {
    numero: 22,
    categoria: "Suit Premium" as const,
    piso: 2,
    precio_diario: 85000,
    descripcion: "Suite Premium con sala de estar, minibar y vistas al jardín."
  },
  {
    numero: 28,
    categoria: "Suit Premium" as const,
    piso: 2,
    precio_diario: 90000,
    descripcion: "Suite elegante con balcón privado y decoración moderna."
  },
  {
    numero: 33,
    categoria: "Turista Vista al Mar" as const,
    piso: 3,
    precio_diario: 65000,
    descripcion: "Habitación con vista panorámica al mar, ideal para viajes de negocios."
  },
  {
    numero: 35,
    categoria: "Suit Premium" as const,
    piso: 3,
    precio_diario: 95000,
    descripcion: "Suite individual espaciosa con zona de trabajo y vistas panorámicas."
  },
  {
    numero: 40,
    categoria: "Turista Doble" as const,
    piso: 4,
    precio_diario: 55000,
    descripcion: "Habitación doble acogedora, con todas las comodidades básicas."
  },
  {
    numero: 44,
    categoria: "Turista Vista al Mar" as const,
    piso: 4,
    precio_diario: 70000,
    descripcion: "Habitación con vista al mar, decoración moderna y balcón privado."
  }
]

const usuariosData = [
  {
    name: "Alice",
    email: "alice@gmail.com",
    password: "alice123"
  },
  {
    name: "Pepe",
    email: "pepe@gmail.com",
    password: "pepe123"
  }
]

const reservasData = [
  { room_id: 1, fecha_inicio: "2025-10-01", fecha_termino: "2025-10-29" },
  { room_id: 2, fecha_inicio: "2025-10-05", fecha_termino: "2025-11-02" },
  { room_id: 3, fecha_inicio: "2025-10-10", fecha_termino: "2025-11-07" },
  { room_id: 4, fecha_inicio: "2025-10-15", fecha_termino: "2025-11-12" },
  { room_id: 5, fecha_inicio: "2025-10-20", fecha_termino: "2025-11-24" },
  { room_id: 6, fecha_inicio: "2025-11-01", fecha_termino: "2025-11-29" },
  { room_id: 7, fecha_inicio: "2025-11-05", fecha_termino: "2025-12-03" },
  { room_id: 1, fecha_inicio: "2025-11-10", fecha_termino: "2025-12-08" },
  { room_id: 2, fecha_inicio: "2025-11-20", fecha_termino: "2025-12-18" },
  { room_id: 3, fecha_inicio: "2025-12-01", fecha_termino: "2025-12-29" },
  { room_id: 4, fecha_inicio: "2025-12-05", fecha_termino: "2026-01-02" },
  { room_id: 5, fecha_inicio: "2025-12-10", fecha_termino: "2026-01-14" },
  { room_id: 6, fecha_inicio: "2025-12-20", fecha_termino: "2026-01-24" },
  { room_id: 7, fecha_inicio: "2026-01-01", fecha_termino: "2026-01-29" },
  { room_id: 1, fecha_inicio: "2026-01-05", fecha_termino: "2026-02-02" },
  { room_id: 2, fecha_inicio: "2026-01-10", fecha_termino: "2026-02-07" },
  { room_id: 3, fecha_inicio: "2026-01-20", fecha_termino: "2026-02-17" },
  { room_id: 4, fecha_inicio: "2026-02-01", fecha_termino: "2026-03-01" },
  { room_id: 5, fecha_inicio: "2026-02-05", fecha_termino: "2026-03-05" },
  { room_id: 6, fecha_inicio: "2026-02-15", fecha_termino: "2026-03-15" }
]

async function migrateData() {
  try {
    console.log('🚀 Iniciando migración de datos...')

    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando datos existentes...')
    await supabaseAdmin.from('reservas').delete().neq('id', 0)
    await supabaseAdmin.from('habitaciones').delete().neq('id', 0)
    await supabaseAdmin.from('usuarios').delete().neq('id', 0)

    // Insertar usuarios
    console.log('👤 Insertando usuarios...')
    const { data: usuarios, error: usuariosError } = await supabaseAdmin
      .from('usuarios')
      .insert(usuariosData)
      .select()

    if (usuariosError) {
      console.error('Error insertando usuarios:', usuariosError)
      return
    }

    console.log(`✅ ${usuarios?.length} usuarios insertados`)

    // Insertar habitaciones
    console.log('🏨 Insertando habitaciones...')
    const { data: habitaciones, error: habitacionesError } = await supabaseAdmin
      .from('habitaciones')
      .insert(habitacionesData)
      .select()

    if (habitacionesError) {
      console.error('Error insertando habitaciones:', habitacionesError)
      return
    }

    console.log(`✅ ${habitaciones?.length} habitaciones insertadas`)

    // Insertar reservas
    console.log('📅 Insertando reservas...')
    const { data: reservas, error: reservasError } = await supabaseAdmin
      .from('reservas')
      .insert(reservasData)
      .select()

    if (reservasError) {
      console.error('Error insertando reservas:', reservasError)
      return
    }

    console.log(`✅ ${reservas?.length} reservas insertadas`)

    console.log('🎉 ¡Migración completada exitosamente!')
    console.log(`📊 Resumen:`)
    console.log(`   - ${usuarios?.length} usuarios`)
    console.log(`   - ${habitaciones?.length} habitaciones`)
    console.log(`   - ${reservas?.length} reservas`)

  } catch (error) {
    console.error('❌ Error durante la migración:', error)
  }
}

// Ejecutar migración si se llama directamente
if (require.main === module) {
  migrateData()
}

export { migrateData }
