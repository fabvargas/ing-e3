export function soloFechaChile(fecha: Date): Date {
 
  // Convertir la fecha a string en zona horaria de Chile
  const fechaChileStr = fecha.toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });


  // Parsear de nuevo a Date
  const [day, month, year] = fechaChileStr.split("-").map(Number);
  const newDate =  new Date(year, month - 1, day, 0, 0, 0, 0); 
 
  return newDate
}