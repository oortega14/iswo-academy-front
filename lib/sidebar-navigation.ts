import { BuildRouteProps } from "@/types/sidebar"

export const buildRoute = ({
  category,
  subcategory,
  userId,
  academyId,
  courseId,
}: BuildRouteProps) => {
  const normalizedCategory = category.toLowerCase()
  let normalizedSubcategory = subcategory
  if (typeof subcategory === "string") {
    normalizedSubcategory = subcategory.toLowerCase()
  }
  console.log(normalizedCategory)
  console.log(normalizedSubcategory)

  switch (normalizedCategory) {
    // students_routes
    case "student-courses":
      switch (normalizedSubcategory) {
        case "home":
          return `/student/${userId}/dashboard/main`
        case "in_progress_courses":
          return `/student/${userId}/dashboard/in_progress`
        case "ended_courses":
          return `/student/${userId}/dashboard/ended`
      }
    case "student-help":
      switch (normalizedSubcategory) {
        case "home":
          return `/student/${userId}/help/main`
        case "messages":
          return `/student/${userId}/help/messages`
      }
    // teachers_routes
    case "teacher-courses":
      switch (normalizedSubcategory) {
        case "home":
          return `/teacher/${userId}/dashboard/main`
        case "messages":
          return `/teacher/${userId}/dashboard/messages`
      }
    case "teacher-help":
      switch (normalizedSubcategory) {
        case "home":
          return `/teacher/${userId}/help/main`
        case "messages":
          return `/teacher/${userId}/help/messages`
      }
    // admin_routes
    case "dashboard":
      switch (normalizedSubcategory) {
        case "inicio":
          return `/academies/${academyId}/dashboard/main`
        case "mensajes":
          return `/academies/${academyId}/dashboard/messages`
        case "icon":
          return `/academies/${academyId}/dashboard/main`
      }

    case "admin-courses":
      return `admin/${userId}/academies/${academyId}/courses/${subcategory}/content`
    case "administrar cursos":
      switch (normalizedSubcategory) {
        case "contenido":
          return `/academies/${academyId}/courses/${courseId}/content`
        case "estudiantes":
          return `/academies/${academyId}/courses/${courseId}/students`
        case "evaluacion":
          return `/academies/${academyId}/courses/${courseId}/evaluation`
        case "certificado":
          return `/academies/${academyId}/courses/${courseId}/certificate`
        case "icon":
          return `/academies/${academyId}}/courses/${courseId}/content`
      }
    // super_admin_routes
    case "superadmin-back-office":
      switch (normalizedSubcategory) {
        case "home":
          return `/super-admin/${userId}/back-office/main`
        case "messages":
          return `/super-admin/${userId}/back-office/messages`
      }

    default:
      return "/"
  }
}

export default buildRoute
