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
    case "admin-dashboard":
      switch (normalizedSubcategory) {
        case "home":
          return `/admin/${userId}/academies/${academyId}/dashboard/main`
        case "messages":
          return `/admin/${userId}/academies/${academyId}/dashboard/messages`
      }

    case "admin-courses":
      return `/admin/${userId}/academies/${academyId}/courses/${subcategory}/content`
    case "admin-edit-courses":
      switch (normalizedSubcategory) {
        case "content":
          return `/admin/${userId}/academies/${academyId}/courses/${courseId}/content`
        case "students":
          return `/admin/${userId}/academies/${academyId}/courses/${courseId}/students`
        case "evaluation":
          return `/admin/${userId}/academies/${academyId}/courses/${courseId}/evaluation`
        case "certificate":
          return `/admin/${userId}/academies/${academyId}/courses/${courseId}/certificate`
      }
    case "admin-help":
      switch (normalizedSubcategory) {
        case "home":
          return `/admin/${userId}/help/main`
        case "messages":
          return `/admin/${userId}/help/messages`
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
