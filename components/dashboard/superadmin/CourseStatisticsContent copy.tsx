"use client"

import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export const CourseStatisticsContent = () => {

  
  return (
    <div className="mt-4">
      <div className="flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 text-2xl font-semibold ">
          A continuación tienes algunas estadisticas de los cursos en la
          plataforma
        </h1>
      </div>
      <div className="flex w-full flex-col items-start justify-center ">
        <div className="m-5 flex w-full space-x-16">
          <div className="flex w-1/2 flex-col items-center justify-center">
            <h2 className="mb-3 text-2xl text-center">
              Cursos inscritos a la largo de los años
            </h2>
            <Bar
              data={{
                labels: ["2019", "2020", "2021"],
                datasets: [
                  {
                    label: "Cursos inscritos",
                    data: [200, 310, 400],
                    backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                    borderRadius: 5,
                  },
                  {
                    label: "Estudiantes desertantes",
                    data: [50, 68, 90],
                    backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                    borderRadius: 5,
                  },
                ],
              }}
            />
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center">
            <h2 className="mb-3 text-center text-2xl">
              Cursos inscritos a la largo de los años
            </h2>
            <Doughnut
              data={{
                labels: ["2019", "2020", "2021"],
                datasets: [
                  {
                    label: "Cursos inscritos",
                    data: [200, 310, 400],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="my-10 ml-5 w-2/3">
          <h2 className="mb-3 text-2xl text-center">
            Cursos inscritos a la largo de los años
          </h2>
          <Line
            data={{
              labels: ["2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  label: "Cursos terminados",
                  data: [200, 310, 400, 200, 500],
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Cursos desertados",
                  data: [150, 110, 180, 20, 220],
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseStatisticsContent
