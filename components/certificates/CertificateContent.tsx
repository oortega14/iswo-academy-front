"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { IconEdit, IconList, IconTrash, IconUser } from "@tabler/icons-react"

import { cn, truncarTexto } from "@/lib/utils"
import useGetCertificates from "@/hooks/useGetCertificates"
import useGetCourses from "@/hooks/useGetCourses"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import DeleteCourseModal from "../modals/DeleteCourseModal"
import LoadingModal from "../modals/LoadingModal"
import NoContent from "../ui/NoContent"
import { Button, buttonVariants } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const CertificateContent = () => {
  const [loading, setLoading] = useState<boolean>()
  const { academyId } = useParams<{ academyId: string }>()
  const certificates = useGetCertificates({
    setLoadingCallback: setLoading,
  })

  console.log(certificates)

  if (loading) {
    return <LoadingModal />
  }

  return (
    <>
      {certificates.length > 0 ? (
        <TooltipProvider>
          <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0">
            <h1 className="ml-3 mt-4 whitespace-nowrap text-2xl font-semibold">
              Los certificados disponibles son
            </h1>
          </div>
          <Table className="w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/4 ">Titulo del Curso</TableHead>
                <TableHead className="w-2/4 ">Link de descarga</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="w-2/4">
                    {certificate.course_title}
                  </TableCell>
                  <TableCell className="w-2/4">
                    <a
                      href={certificate.file_url}
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "border-[1px] px-2"
                      )}
                    >Descargar Certificado</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      ) : (
        <NoContent />
      )}
    </>
  )
}
export default CertificateContent
