import React from 'react'

export const BannerSection = () => {
  return (
    <section className='relative flex justify-center top-20 bg-slate-100 px-5 md:px-24 dark:bg-slate-900 pt-20'>
      <div>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Una solucion integral para tu empresa<br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
        Desarrolla competencias y habilidades específicas para tus Clientes y Colaboradores; con dominio, diseño, recursos, exámenes y certificados automatizados y personalizados.
        Desarrolla Competencia y Compromiso en el Talento Humano con Calidad y al menor costo.
        </p>
      </div>
    </section>
  )
}

export default BannerSection