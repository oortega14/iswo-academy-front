import { BuildRouteProps, BuildRouteVPlayerProps } from "@/types/sidebar"

export const buildRoute = ({
  category,
  subcategory,
  userId,
  academyId,
  courseId,
}: BuildRouteProps) => {
  const normalizedCategory = category.toLowerCase()
  const normalizedSubcategory = subcategory.toLowerCase()

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
        case "acquired_courses":
          return `/student/${userId}/dashboard/acquired`
      }
    case "student-certificates":
      switch (normalizedSubcategory) {
        case "home":
          return `/student/${userId}/certificates/main`
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
    case "admin-configure":
      switch (normalizedSubcategory) {
        case "configure-academy":
          return `/admin/${userId}/academies/${academyId}/dashboard/configure`
      }

    case "admin-get-learning-routes":
      switch (normalizedSubcategory) {
        case "content":
          return `/admin/${userId}/academies/${academyId}/dashboard/learning-routes`
      }

    case "admin-get-courses":
      switch (normalizedSubcategory) {
        case "content":
          return `/admin/${userId}/academies/${academyId}/courses/content`
        case "new-course":
          return `/admin/${userId}/academies/${academyId}/courses/new-course`
      }

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
          return `/admin/${userId}/academies/${academyId}/help/main`
        case "messages":
          return `/admin/${userId}/academies/${academyId}/help/messages`
      }
    // super_admin_routes
    case "superadmin-back-office":
      switch (normalizedSubcategory) {
        case "home":
          return `/super-admin/${userId}/dashboard/main`
        case "courses":
          return `/super-admin/${userId}/back-office/courses`
        case "learning-routes":
          return `/super-admin/${userId}/back-office/learning-routes`
        case "academies":
          return `/super-admin/${userId}/back-office/academies`
      }

    // profile_routes
    case "profile-info":
      switch (normalizedSubcategory) {
        case "home":
          return `/users/${userId}/profile/info`
      }
    case "profile-photo":
      switch (normalizedSubcategory) {
        case "home":
          return `/users/${userId}/profile/photo`
      }
    case "profile-account":
      switch (normalizedSubcategory) {
        case "home":
          return `/users/${userId}/profile/account`
      }
    case "profile-erase":
      switch (normalizedSubcategory) {
        case "home":
          return `/users/${userId}/profile/delete-account`
      }

    default:
      return "/"
  }
}

export const buildRouteVPlayer = ({
  sectionId,
  lessonId,
  courseId,
  academyId,
}: BuildRouteVPlayerProps) => {
  return `/academies/${academyId}/courses/${courseId}/video-player/sections/${sectionId}/lessons/${lessonId}`
}

const sidebarNavigation = {
  buildRoute,
  buildRouteVPlayer,
}

export default sidebarNavigation
