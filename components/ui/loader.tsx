import React from "react"
import PropTypes from "prop-types"

interface Props {
  width?: string,
  height?: string
}

const Loader = ({ width, height }: Props) => {
  const shimmerStyle = {
    width: width || "100%", // Usa el ancho proporcionado o 100% por defecto
    height: height || "16px", // Usa la altura proporcionada o 16px por defecto
  }

  return (
    <div
      className="bg-gradient-to-r from-transparent via-slate-400 to-transparent bg-no-repeat bg-shimmer animate-shimmer rounded-lg dark:via-[#343434]"
      style={shimmerStyle}
    ></div>
  )
}

Loader.propTypes = {
  width: PropTypes.string, // Propiedad para el ancho del efecto shimmer
  height: PropTypes.string, // Propiedad para la altura del efecto shimmer
}

export { Loader }
