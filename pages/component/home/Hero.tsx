import HeroInfo from "./HeroInfo"

export default function Hero() {
  return (
   
      <section 
        className="h-[900px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://api.builder.io/api/v1/image/assets/TEMP/ac751343147f263ccc7c2635f3a18949d466270c?width=2882')`
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-lato font-bold text-white text-5xl md:text-7xl leading-tight mb-6 max-w-6xl">
            BIENVENIDO A HOTEL PACIFIC REEF
          </h1>
          <p className="font-ubuntu font-medium text-white text-2xl mb-12">
            Vive el Pacífico, siente el descanso.
          </p>
          
          {/* CTA Button */}
          <button className="bg-primary text-white font-ubuntu font-medium text-2xl px-16 py-6 rounded-xl hover:bg-opacity-90 transition-all duration-300">
            INICIAR SESIÓN
          </button>
        </div>

         <HeroInfo></HeroInfo>
        
      </section>
  )
}
