"use client";

import { ChevronDown } from "lucide-react";
import { filterRoomsAction } from "@/app/actions/filterFreeRoom";

export default function SearchForm() {
  return (
    <form
      action={filterRoomsAction}
      className="w-full bg-secondary flex flex-wrap py-6 justify-center gap-7"
    >
      {/* Tipo de Cama Select */}
      <div className="relative">
        <select
          name="tipoCama"
          className="bg-white border border-gray-300 rounded-xl px-4 py-4 font-ubuntu text-xl text-gray-700 cursor-pointer appearance-none pr-10"
          defaultValue=""
        >
          <option value="">Tipo de Cama (Opcional)</option>
          <option value="Individual">Individual</option>
          <option value="Doble">Doble</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coral pointer-events-none" />
      </div>

      {/* Check-in Date */}
      <input
        type="date"
        name="fechaInicio"
        required
        className="bg-white border border-gray-300 rounded-xl px-4 py-4 font-ubuntu text-xl text-gray-700 cursor-pointer"
      />

      {/* Check-out Date */}
      <input
        type="date"
        name="fechaTermino"
        required
        className="bg-white border border-gray-300 rounded-xl px-4 py-4 font-ubuntu text-xl text-gray-700 cursor-pointer"
      />

      <button
        type="submit"
        className="bg-primary text-white font-ubuntu font-medium text-xl px-6 py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300"
      >
        Buscar Habitaciones
      </button>
    </form>
  );
}
