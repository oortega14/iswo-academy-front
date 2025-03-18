export const BannerSection = () => {
  return (
    <section className="relative top-20 flex justify-center bg-slate-100 px-5 pt-20 dark:bg-slate-900 md:px-24">
      <div>
        <div className="max-w-[750px] flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Una solución integral para tu empresa
          <br className="hidden sm:inline" />
        </h1>
          <p className="mt-3 text-justify text-lg text-muted-foreground">
            Desarrolla competencias y habilidades específicas para tus Clientes
            y Colaboradores; con dominio, diseño, recursos, exámenes y
            certificados automatizados y personalizados. Desarrolla Competencia
            y Compromiso en el Talento Humano con Calidad y al menor costo.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BannerSection
