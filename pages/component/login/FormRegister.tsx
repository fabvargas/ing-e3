"use client"

import { useActionState, useEffect } from "react";
import { checkRegister } from "@/app/actions/checkRegister"
import { useRouter } from "next/navigation";

import React from 'react'

interface ResponseAction<T> {
  error: boolean
  data?: T
  message?: string
}

const initialState : ResponseAction<string> = {
  error:false
}


export default function FormRegister() {
  const router = useRouter();
  const [state, formAction] = useActionState(checkRegister, initialState);

  // Redirigir después del éxito
  useEffect(() => {
    if (!state.error && state.message && state.message.includes("exitosamente")) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000); // Redirigir después de 2 segundos
      
      return () => clearTimeout(timer);
    }
  }, [state, router]);
  return (
    <form className="flex flex-col gap-3 w-full py-0 p-10" action={formAction}>
          {/* Email */}
          <div>
            <label className="font-ubuntu text-white text-md font-bold block mb-2">
              Email
            </label>
            <input
              name="email"
              className="w-full bg-transparent border-b-[1.3px] border-white text-white text-md focus:outline-none focus:border-white/80 transition-colors font-ubuntu placeholder:text-white/50"
            />
          </div>

             {/* nombre */}
          <div>
            <label className="font-ubuntu text-white text-md font-bold block mb-2">
              Nombre
            </label>
            <input
              name="nombre"
              className="w-full bg-transparent border-b-[1.3px] border-white text-white text-md focus:outline-none focus:border-white/80 transition-colors font-ubuntu placeholder:text-white/50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-ubuntu text-white text-md font-bold block">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full bg-transparent border-b-[1.3px] border-white text-white text-md focus:outline-none focus:border-white/80 transition-colors font-ubuntu placeholder:text-white/50"
            />
          </div>

              {/* Password */}
          <div>
            <label className="font-ubuntu text-white text-md font-bold block">
              Confirmar Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="w-full bg-transparent border-b-[1.3px] border-white text-white text-md focus:outline-none focus:border-white/80 transition-colors font-ubuntu placeholder:text-white/50"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-10 flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-ubuntu text-md font-bold rounded-sm hover:bg-[#D76540]/90 transition-colors py-4 w-full"
            >
              Registrarse
            </button>
            {state.error && <p className="text-destructive">{state.message}</p>}
            {!state.error && state.message && <p className="text-green-500">{state.message}</p>}
          </div>
        </form>
  )
}
