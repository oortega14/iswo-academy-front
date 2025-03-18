import { Link } from "react-router-dom"
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants/home"
import { IswoIconLarge } from "@/icons"
import FooterColumn from "./FooterColumn"

const Footer = () => {
  return (
    <footer className="relative top-28 mb-24 flex items-center justify-center py-20">
      <div className="3xl:px-0 mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 md:px-24">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            <div className="flex flex-col gap-0">
              <Link to="/" className="m-0">
                <IswoIconLarge className="h-32 w-40 dark:invert" />
              </Link>
              <h4 className="text-xl font-bold"> ISWO </h4>
              <p className="mb-4 text-pretty">
                Productividad y Competitividad Organizacional{" "}
              </p>
              {FOOTER_LINKS.map((column) => (
                <FooterColumn title={column.title} key={column.title}>
                  <ul className="regular-14 text-gray-30 flex flex-col gap-4">
                    {column.links.map((link) => (
                      <div className="flex items-center" key={link.label}>
                        <link.icon className="mr-2 size-8" />
                        <span>{link.label}</span>
                      </div>
                    ))}
                  </ul>
                </FooterColumn>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    className="flex gap-4 md:flex-col lg:flex-row"
                    rel="noreferrer"
                  >
                    <p className="whitespace-nowrap ">{link.label}</p>
                  </a>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                {SOCIALS.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    className="flex gap-4 md:flex-col lg:flex-row"
                    rel="noreferrer"
                  >
                    <link.icon />
                    <p className="whitespace-nowrap">{link.label}</p>
                  </a>
                ))}
                <img
                  src="/images/Certificacion_ISO_ISWO.webp"
                  alt="certification"
                  className="h-3/5 w-3/5"
                />
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="bg-gray-20 border" />
        <p className="w-full text-center text-sm text-muted-foreground">
          ISWO Academy | Todos los Derechos Reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer
