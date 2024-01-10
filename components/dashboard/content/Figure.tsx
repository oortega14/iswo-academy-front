import { Loader } from "@/components/ui/loader"
import { useState } from "react"

interface FigureProps {
  image: string
}

const Figure = ({ image }: FigureProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div className="flex justify-center pt-3 rounded-lg relative mr-2">
      {!imageLoaded && <Loader height="160px" width="160px" />}
      <img
        src={image}
        alt="curso"
        className={`min-h-40 min-w-40 rounded-lg overflow-hidden w-full border-[1px] ${
          imageLoaded ? "opacity-100" : "opacity-0 hidden"
        } mb-3`}
        onLoad={()=>{setImageLoaded(true)}}
      />
    </div>
  )
}

export default Figure
