import FooterLogin from "@/pages/component/login/FooterLogin"
import FormLogin from "@/pages/component/login/FormLogin"




export default function Page() {

 


  return (
    <div className="relative w-full h-screen object-fill bg-[#f9f9f9]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 object-contain">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/389b9d33c7c7c44643142b3e4683134c7c3b3d45?width=3908"
          alt="Hotel Pacific Reef"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tarjeta principal */}
      <div className="flex flex-col gap-4 p-2 w-full max-w-[450px] pt-16 pb-10 absolute z-10 lg:justify-start md:left-12 md:translate-x-0 top-5  right-1/2 translate-x-1/2 bg-black/70 backdrop-blur-sm border border-[#e6e6e6]/60 rounded-md">
        <h1 className="font-lato text-white text-center font-bold text-4xl leading-tight">
          HOTEL<br />PACIFIC REEF
        </h1>

        <p className="font-ubuntu text-white text-center text-md">
          Vive el Pacífico, siente el descanso.
        </p>

        {/* Formulario con acción del servidor */}
       <FormLogin></FormLogin>
        
      </div>

      <FooterLogin from="login"/>
    </div>
  )
}
