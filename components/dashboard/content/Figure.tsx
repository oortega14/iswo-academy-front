import { Loader } from "@/components/ui/loader"
import Image from "next/image"
import { useState } from "react"

interface FigureProps {
  image: string
}

const Figure = ({ image }: FigureProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div className="relative mr-2 flex justify-center rounded-lg pt-3">
      {/* {!imageLoaded && <Loader height="160px" width="160px" />} */}
      <Image
        src={image}
        alt="curso"
        width={160}
        height={160}
        className={`mb-3 min-h-40 w-full min-w-40 overflow-hidden rounded-lg border-[1px]`}
        placeholder='blur'
        blurDataURL="@/components/ui/loader"
      />
    </div>
  )
}

export default Figure
