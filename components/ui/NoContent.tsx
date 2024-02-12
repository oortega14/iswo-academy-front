import data from "@/animations/FilesNotFoundAnimation.json"
import Lottier from "lottie-react"

const NoContent = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="w-1/3">
          <Lottier animationData={data} />
        </div>
        <h2 className="text-xl xl:text-4xl font-bold">
          Aún no tienes registros disponibles
        </h2>
      </div>
    </>
  )
}

export default NoContent
