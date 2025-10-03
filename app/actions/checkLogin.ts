"use server"

import { UserService } from "@/backend/services/user-service"
import { redirect } from "next/navigation" 

interface ResponseAction<T> {
  error: boolean
  data?: T
  message?: string
}

export async function checkLogin(
  prevState: ResponseAction<string>,
  formData: FormData
): Promise<ResponseAction<string>> {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  const userService = new UserService()

  // Validaciones básicas
  if (!email || !password) {
    return {
      error: true,
      message: "Por favor, completa todos los campos.",
    }
  }

  const userFound = await userService.findUserByEmail(email)

  if (!userFound) {
    return {
      error: true,
      message: "Usuario no encontrado.",
    }
  }

  redirect("/home") 
}
