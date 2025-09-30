"use server";

import { redirect } from "next/navigation";

export async function filterRoomsAction(formData: FormData) {
  const categoria = formData.get("categoria") as string;
  const fechaInicio = formData.get("fechaInicio") as string;
  const fechaTermino = formData.get("fechaTermino") as string;

  // Redirige con parámetros en la URL
  redirect(
    `/reservation?categoria=${categoria}&fechaInicio=${fechaInicio}&fechaTermino=${fechaTermino}`
  );
}
