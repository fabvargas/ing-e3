"use client"

import { useActionState } from "react";
import { checkLogin } from "@/app/actions/checkLogin"



import React from 'react'

interface ResponseAction<T> {
  error: boolean
  data?: T
  message?: string
}

const initialState : ResponseAction<string> = {
  error:false
}


export default function FormLogin() {

const [state, formAction] = useActionState(checkLogin, initialState);
  return (
    <form className="flex flex-col gap-4 w-full p-10" action={formAction}>
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

          {/* Botón */}
          <div className="flex justify-center mt-10 flex-col">
            <button
              type="submit"
              className="bg-primary text-white font-ubuntu text-md font-bold rounded-sm hover:bg-[#D76540]/90 transition-colors py-4 w-full"
            >
              Ingresar
            </button>
            <p className="text-destructive">{state.error && state.message}</p>
          </div>
        </form>
  )
}
