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
      <img
        src={image}
        alt="curso"
        className={`mb-3 max-h-64 max-w-64 overflow-hidden rounded-lg border-[1px]`}
      />
    </div>
  )
}

export default Figure
