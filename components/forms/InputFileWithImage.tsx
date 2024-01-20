import { InputFileWithImageProps } from "@/types/forms"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"

const InputFileWithImage = ({
  Icon,
  label,
  name,
  image,
  onChange,
}: InputFileWithImageProps) => {
  return (
    <div>
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <div
        className={cn({
          "flex space-x-3 items-center": !!image,
        })}
      >
        {!!image && (
          <div className="flex justify-start items-center rounded-xl overflow-hidden my-4 max-w-[220px]">
            <div>
              <img
                src={image}
                alt="vista-previa-imagen"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <Input type="file" id={name} onChange={onChange} className="mt-2" />
      </div>
    </div>
  )
}

export default InputFileWithImage
