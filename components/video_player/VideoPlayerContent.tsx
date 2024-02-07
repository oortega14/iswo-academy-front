"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"

import useGetCourse from "@/hooks/useGetCourse"
import useGetCourseSections from "@/hooks/useGetCourseSections"
import useGetLessons from "@/hooks/useGetLessons"

import Comments from "./Comments"
import VideoPlayer from "./VideoPlayer"
import VideoInfo from "./VideoInfo"

const VideoPlayerContent = () => {
  const { courseId, sectionId, lessonId } = useParams<{
    courseId: string
    sectionId: string
    lessonId: string
  }>()
  const [loading, setLoading] = useState(true)
  const sections = useGetCourseSections({
    courseId: courseId,
    setLoadingCallback: setLoading,
  })
  if (loading) {
    return <div></div>
  } else {
    const selectedSectionId = JSON.parse(sectionId)
    const selectedLessonId = JSON.parse(lessonId)
    const selectedSection = sections.find(
      (section) => section.id === selectedSectionId
    )
    const selectedLesson = selectedSection?.lessons.find(
      (lesson) => lesson.id === selectedLessonId
    )
    return (
      <div className="w-full">
        {selectedLesson!! && (
          <>
            <VideoPlayer video={selectedLesson?.url_video || ""} />
            <VideoInfo lesson={selectedLesson} />
            <Comments lesson={selectedLesson} />
          </>
        )}
      </div>
    )
  }
}

export default VideoPlayerContent
