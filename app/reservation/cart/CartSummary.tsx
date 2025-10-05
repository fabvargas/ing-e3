"use client"
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Room } from '@/backend/models/room-model'

// Calcula la diferencia en días entre dos fechas (se usa UTC a medianoche)
// Devuelve 0 si la fecha de término es anterior o igual a la de inicio.
function daysBetween(start: Date, end: Date) {
  const msPerDay = 1000 * 60 * 60 * 24
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) /*Convertir las fechas a formato UTC*/
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  return Math.max(0, Math.floor((utc2 - utc1) / msPerDay))
}
// Parsea una cadena 'YYYY-MM-DD' y devuelve una Date en zona local.
// Evita problemas con `new Date('YYYY-MM-DD')` que puede usar UTC.
function parseDateLocal(dateStr?: string | null): Date | null {
  if (!dateStr) return null
  const parts = dateStr.split('-')
  if (parts.length !== 3) return null
  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null
  return new Date(y, m - 1, d)
}
// Componente cliente: muestra resumen de la reserva y un modal de pasos
// - Lee fechas y número de huéspedes desde los query params
// - Permite ver resumen, añadir acompañantes y avanzar al pago
export default function CartSummary({ room }: { room: Room }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  // Estados locales:
  // open: controla si el modal está mostrado
  // activeTab: pestaña activa dentro del modal (1,2,3)
  // companionCount: cuántos acompañantes se deben llenar
  // companions: datos de cada acompañante
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<number>(1)
  const [companionCount, setCompanionCount] = React.useState<number>(0)
  const [companions, setCompanions] = React.useState(
    [] as { name: string; rut: string; celular: string; nacimiento: string }[]
  )
  // Estados para el formulario de pago
  const [cardType, setCardType] = React.useState("")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [paymentErrors, setPaymentErrors] = React.useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = React.useState(false)
  // Sincroniza el array `companions` con `companionCount`.
  // Si aumentas la cantidad, agrega objetos vacíos. Si la reduces, los recorta.
  React.useEffect(() => {
    setCompanions((prev) => {
      const next = [...prev]
      if (companionCount > prev.length) {
        for (let i = prev.length; i < companionCount; i++) {
          next.push({ name: "", rut: "", celular: "", nacimiento: "" })
        }
      } else if (companionCount < prev.length) {
        next.length = companionCount
      }
      return next
    })
  }, [companionCount])
  const fechaInicio = searchParams?.get('fechaInicio')
  const fechaTermino = searchParams?.get('fechaTermino')
  
  // Convertir las fechas de inicio y término a objetos Date
  const inicio = parseDateLocal(fechaInicio)
  const termino = parseDateLocal(fechaTermino)

  // Si faltan fechas en los query params, mostramos un mensaje de ayuda
  if (!inicio || !termino) {
    return (
      <div className="w-full max-w-[900px] m-auto bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-medium mb-4">Faltan fechas</h2>
        <p className="mb-4">No se encontraron las fechas de inicio o término. Vuelve al buscador y selecciona las fechas antes de reservar.</p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => router.back()}>Volver al buscador</button>
        </div>
      </div>
    )
  }

  const noches = Math.max(1, daysBetween(inicio, termino))
  const subtotal = noches * (room?.precioDiario ?? 0)

  // Valida el formulario de pago y muestra el modal de éxito si todo OK
  function handleRealizarReserva() {
    const errors: Record<string, string> = {}
    if (!cardType.trim()) errors.cardType = 'Ingrese el tipo de tarjeta'
    const digits = (cardNumber || '').replace(/\D/g, '')
    if (!digits || digits.length < 12) errors.cardNumber = 'Número de tarjeta inválido'
    if (!expiry.trim()) errors.expiry = 'Ingrese fecha de vencimiento'
    if (!cvc.trim() || cvc.length < 3) errors.cvc = 'Código inválido'

    setPaymentErrors(errors)
    // Si hay errores, no continuar
    if (Object.keys(errors).length > 0) return

    // Simular pago exitoso: mostrar popup de confirmación
    setShowSuccess(true)
  }

  // Contenido principal: resumen y botón para abrir el modal
  return (
    <div className="w-full max-w-[900px] m-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-medium mb-4">Resumen de la reserva</h2>

    <div className="flex gap-6 items-center mb-4">
      <img alt={`${room.tipo} ${room.categoria}`} src="https://api.builder.io/api/v1/image/assets/TEMP/8ccd5129669f5284f823a95550463369243d2667?width=400" className="w-36 h-24 object-cover rounded" />
        <div>
          <p className="font-medium">{`${room.tipo} ${room.categoria}`}</p>
          <p className="text-sm text-gray-500">Habitación #{room.numero}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Fecha inicio</p>
          <p>{inicio.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha término</p>
          <p>{termino.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <p>Noches: <strong>{noches}</strong></p>
        <p>Precio por noche: <strong>${room.precioDiario}</strong></p>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="font-medium">Total</p>
        <p className="text-xl font-bold">${subtotal}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => router.back()}>Volver</button>
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => setOpen(true)}>Confirmar y Pagar</button>
      </div>

      {/* Modal: pasos para confirmar reserva (Resumen / Acompañantes / Pago) */}
      {/* Se muestra cuando open === true */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white w-[760px] max-w-[95%] rounded-lg shadow-xl p-6 z-10">
            {/* Pestañas superiores: navegar entre los pasos */}
            <div className="flex gap-2 mb-4">
              <button className={`px-4 py-2 rounded-t ${activeTab === 1 ? 'bg-gray-200' : 'bg-gray-100'}`} onClick={() => setActiveTab(1)}>1. Resumen</button>
              <button className={`px-4 py-2 ${activeTab === 2 ? 'bg-gray-300' : 'bg-gray-100'}`} onClick={() => setActiveTab(2)}>2. Acompañantes</button>
              <button className={`px-4 py-2 ${activeTab === 3 ? 'bg-gray-200' : 'bg-gray-100'}`} onClick={() => setActiveTab(3)}>3. Pago de la reserva</button>
            </div>

            {/* Contenido por pestaña: mostramos secciones distintas según activeTab */}
            {activeTab === 1 && (
              <>
                <h3 className="text-3xl font-medium text-center mb-6">Resumen de la reserva</h3>

                <div className="grid grid-cols-4 gap-4 text-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <div className="bg-gray-100 rounded mt-2 py-2">{inicio.toLocaleDateString()}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-Out</p>
                    <div className="bg-gray-100 rounded mt-2 py-2">{termino.toLocaleDateString()}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Huéspedes</p>
                    <div className="bg-gray-100 rounded mt-2 py-2">{Number(searchParams?.get('huespedes')) || 1}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <div className="bg-gray-100 rounded mt-2 py-2">${subtotal}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-lg mb-2">Tipo de habitación</p>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="font-medium">{room.tipo} {room.categoria}</p>
                    <p className="text-sm text-gray-500">Habitación #{room.numero} • ${room.precioDiario} por noche</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mb-4">
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setOpen(false)}>Anular reserva</button>
                  <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => setActiveTab(2)}>Siguiente</button>
                </div>
              </>
            )}

            {activeTab === 2 && (
              <div>
                <h3 className="text-3xl font-medium text-center mb-6">Detalle de los acompañantes</h3>
                <div className="flex items-center gap-4 mb-4">
                  <label className="font-medium">Cantidad de acompañantes</label>
                  <input type="number" min={0} value={companionCount} onChange={(e) => setCompanionCount(Math.max(0, Number(e.target.value || 0)))} className="w-16 text-center bg-gray-100 rounded" />
                </div>

                {/* Bloques visibles por acompañante con sus campos (Nombre, Rut, Celular, Nacimiento) */}
                <div className="space-y-3">
                  {companions.map((c, idx) => (
                    <div key={idx} className="border rounded">
                      <div className="bg-secondary text-white px-4 py-3 font-medium text-lg">{idx + 1}. Huesped</div>
                      <div className="p-4 bg-blue-50">
                        <label className="block text-sm mb-1">Nombre Completo</label>
                        <input value={c.name} onChange={(e) => { const copy = [...companions]; copy[idx].name = e.target.value; setCompanions(copy) }} className="w-full mb-3 h-8 bg-gray-200 rounded" />

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm mb-1">Rut</label>
                            <input value={c.rut} onChange={(e) => { const copy = [...companions]; copy[idx].rut = e.target.value; setCompanions(copy) }} className="w-full h-8 bg-gray-200 rounded" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Celular</label>
                            <input value={c.celular} onChange={(e) => { const copy = [...companions]; copy[idx].celular = e.target.value; setCompanions(copy) }} className="w-full h-8 bg-gray-200 rounded" />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Fecha de nacimiento</label>
                            <input type="date" value={c.nacimiento} onChange={(e) => { const copy = [...companions]; copy[idx].nacimiento = e.target.value; setCompanions(copy) }} className="w-full h-8 bg-gray-200 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setOpen(false)}>Anular reserva</button>
                  <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => setActiveTab(3)}>Siguiente</button>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div>
                <h3 className="text-3xl font-medium text-center mb-6">Pago de la reserva</h3>

                {/* Diseño dividido: izquierda = formulario de tarjeta, derecha = logo/alternativas */}
                {/* Envolver en un <form autoComplete="off"> para evitar avisos de autocompletado del navegador */}
                <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleRealizarReserva() }} className="payment-form">
                  <div className="flex gap-6 mb-6 payment-section">
                  {/* Columna izquierda: campos del formulario de pago */}
                  <div className="w-1/2">
                    <label className="block text-lg mb-2">Tipo de Tarjeta</label>
                    <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="w-full bg-gray-100 h-10 rounded mb-1 px-3" name="cc-type" aria-label="Tipo de tarjeta">
                      <option value="">Seleccione...</option>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                    </select>
                    {paymentErrors.cardType && <p className="text-sm text-red-500 mb-2">{paymentErrors.cardType}</p>}

                    <label className="block text-lg mb-2">Número de la tarjeta</label>
                    <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} type="text" inputMode="numeric" name="cc-number" placeholder="0000 0000 0000 0000" className="w-full bg-gray-100 h-10 rounded mb-1 px-3 text-center" />
                    {paymentErrors.cardNumber && <p className="text-sm text-red-500 mb-2">{paymentErrors.cardNumber}</p>}

                    <label className="block text-lg mb-2">Fecha de vencimiento</label>
                    <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/AA" name="cc-exp" className="w-full bg-gray-100 h-10 rounded mb-1 px-3 text-center" />
                    {paymentErrors.expiry && <p className="text-sm text-red-500 mb-2">{paymentErrors.expiry}</p>}

                    <label className="block text-lg mb-2">Código</label>
                    <input value={cvc} onChange={(e) => setCvc(e.target.value)} type="text" inputMode="numeric" name="cc-csc" placeholder="CVC" className="w-full bg-gray-100 h-10 rounded mb-1 px-3 text-center" />
                    {paymentErrors.cvc && <p className="text-sm text-red-500 mb-2">{paymentErrors.cvc}</p>}

                    <button className="px-6 py-3 bg-red-500 text-white font-bold rounded">Pago pendiente</button>
                  </div>

                  {/* Columna derecha: logo de PayPal y acciones */}
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-center mb-6">
                      {/* Logo externo de PayPal; puedes reemplazar por un asset local si prefieres */}
                      <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="max-w-[220px] object-contain" />
                    </div>

                    <div className="w-full flex justify-end gap-3">
                      <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setOpen(false)}>Anular reserva</button>
                      <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => handleRealizarReserva()}>Realizar reserva</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            )}

            {/* Modal de éxito que aparece solo cuando el pago es válido */}
            {showSuccess && (
              <div className="fixed inset-0 z-60 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowSuccess(false)} />
                <div className="relative bg-white w-[760px] max-w-[95%] rounded-lg shadow-xl p-8 border-4 border-secondary z-10">
                  <h2 className="text-4xl font-bold text-center mb-6">¡Pago realizado de forma exitosa!</h2>
                  <p className="mb-6">Fue enviado un correo electrónico al email xxxxx@gmail.com con el comprobante de la reserva y el QR que será solicitado al momento de ingresar a las instalaciones.</p>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="mr-2">Descargar PDF</span>
                      <button className="bg-yellow-300 px-4 py-2 rounded font-medium">Descargar</button>
                    </div>

                    <div className="flex-1" />

                    <button className="px-4 py-2 bg-secondary text-white rounded" onClick={() => { setShowSuccess(false); setOpen(false); router.push('/home') }}>Aceptar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
