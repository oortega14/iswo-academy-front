import { InputFileWithImageProps } from "@/types/forms"
import { cn } from "@/lib/utils"

import Figure from "../dashboard/content/Figure"
import { Input } from "../ui/input"

// previewImage y setPreviewImage es un estado inicializado como un string vacio para guardar las miniaturas de la imagenes que se suban
// setImage es el setter de la imagen que se va a subir a la plataforma

const InputFileWithImage = ({
  Icon,
  label,
  description,
  name,
  defaultImage,
  previewImage,
  setPreviewImage,
  setImage,
}: InputFileWithImageProps) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      let fileReader: FileReader | null
      let isCancel = false

      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader
        if (result && !isCancel) {
          setPreviewImage(result.toString())
        }
      }
      fileReader.readAsDataURL(file)

      return () => {
        isCancel = true
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort()
        }
      }
    }
  }
  return (
    <div className="mb-2">
      {!!defaultImage && !previewImage ? (
        <>
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <Icon className="mr-2 size-5" />
            <label htmlFor={name}>{label}</label>
          </div>
          <div className="flex w-full items-center justify-start space-x-3">
            <Figure image={defaultImage} />
            <div className="mt-3 grid w-full items-center gap-1.5">
              <Input
                id="logo"
                type="file"
                className="cursor-pointer"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 mb-2 flex w-full items-center justify-start rounded-full">
            <Icon className="mr-2 size-5" />
            <label htmlFor={name}>{label}</label>
          </div>
          <div
            className={cn({
              "flex space-x-5 items-center": !!previewImage,
            })}
          >
            {!!previewImage && (
              <div className="my-4 flex max-w-[250px] items-center justify-start overflow-hidden rounded-xl">
                <div>
                  <img
                    src={previewImage}
                    alt="vista-previa-imagen"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="w-full">
              {!!description && (
                <div
                  className={cn("w-full", {
                    "flex justify-center": !!previewImage,
                  })}
                >
                  <span className="text-muted-foreground text-sm ">
                    {description}
                  </span>
                </div>
              )}
              <Input
                type="file"
                id={name}
                onChange={(e) => handleFile(e)}
                className={cn("mt-2 cursor-pointer", {
                  "flex space-x-5 items-center ml-3": !!previewImage,
                })}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InputFileWithImage
