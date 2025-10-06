"use server"

import { UserService } from "@/backend/services/user-service"
import { redirect } from "next/navigation"

interface ResponseAction<T> {
  error: boolean
  data?: T
  message?: string
}

export async function checkRegister(
  prevState: ResponseAction<string>,
  formData: FormData
): Promise<ResponseAction<string>> {
  const nombre = formData.get("nombre")?.toString()
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const confirmpassword = formData.get("confirmpassword")?.toString()

  const userService = new UserService()

 
  if (!nombre || !email || !password || !confirmpassword) {
    return {
      error: true,
      message: "Por favor, completa todos los campos.",
    }
  }

 
  if (password !== confirmpassword) {
    return {
      error: true,
      message: "Las contraseñas no coinciden.",
    }
  }

  try {
   
    const newUser = await userService.registerUser({
      name: nombre,
      email,
      password,
    })

    if (!newUser) {
      return {
        error: true,
        message: "No se pudo registrar el usuario.",
      }
    }

    // Mostrar mensaje de éxito antes de redirigir
    return {
      error: false,
      message: "¡Usuario registrado exitosamente! Redirigiendo...",
    }
   
  } catch (err) {
    return {
      error: true,
      message: (err as Error).message || "Error al registrar el usuario.",
    }
  }
}
