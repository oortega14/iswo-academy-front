import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Link from 'next/link'
import React from 'react'
import FooterColumn from './FooterColumn'
import { IswoIconLarge } from '@/icons'

const Footer = () => {
  return (
    <footer className="flex items-center justify-center mb-24 relative top-20 py-20">
      <div className="px-6 md:px-24 3xl:px-0 mx-auto max-w-[1440px] flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
            <div className='flex flex-col gap-0'>
              <Link href="/" className="m-0">
                <IswoIconLarge className='w-40 h-32 dark:invert'/>
              </Link>
              <h4 className='text-xl font-bold'> ISWO </h4>
              <p className='text-pretty mb-4'> "Productividad y Competitividad Organizacional" </p>
              {FOOTER_LINKS.map((column) => (
                <FooterColumn title={column.title} key={column.title}>
                  <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                    {column.links.map(link=>(
                      <div className='flex items-center' key={link.label}>
                        <link.icon className='mr-2 size-8'/>
                        <p>{link.label}</p>
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
                    target='_blank'
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">
                      {link.label}
                    </p>
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
                    target='_blank'
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <link.icon />
                    <p className="whitespace-nowrap">
                      {link.label}
                    </p>
                  </a>
                ))}
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">2024 Iswo Academy | Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
