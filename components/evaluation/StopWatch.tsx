import React, { useEffect, useState } from 'react'

const Stopwatch = ({tiempoTotal}: any) => {
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const iniciarCuentaRegresiva = (tiempoInicial: number) => {
    let tiempoActual = tiempoInicial;
    const intervalId = setInterval(() => {
      setTiempoRestante(tiempoActual);
      tiempoActual -= 1;
      if (tiempoActual < 0) {
        clearInterval(intervalId);
        setTiempoRestante(0);
      }
    }, 1000);
  };

  const formatearTiempo = (tiempoSegundos: number) => {
    const minutos = Math.floor(tiempoSegundos / 60);
    const segundos = tiempoSegundos % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  };

  useEffect(() => {
    iniciarCuentaRegresiva(tiempoTotal * 60)
  }, [tiempoTotal])

  return (
    <div className='flex w-full items-center justify-center'>
      {tiempoRestante !== 0 ? (
        <span className='text-xl'>
          Tiempo restante: {formatearTiempo(tiempoRestante)}
        </span>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Stopwatch
