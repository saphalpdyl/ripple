"use client"

import { useEffect, useState } from "react"
import getCourses from "@/actions/courses"
import getFiles from "@/actions/getFiles"
import {getPPTQuestions} from "@/actions/getQuestions"

import speak from "@/actions/speak"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, FileText, Book, Volume2 } from "lucide-react"
import toast from "react-hot-toast"

interface Course {
  id: number
  name: string
}

interface File {
  id: number
  display_name: string
  url: string
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courseFiles, setCourseFiles] = useState<File[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleCourseClick = async (course: Course) => {
    setSelectedCourse(course)
    setCourseFiles([])
    try {
      const files = await getFiles(course.id)
      setCourseFiles(files.filter((file: { display_name: string }) => file.display_name.endsWith(".pdf") || file.display_name.endsWith(".ppt")))
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileClick = async (file: File) => {
    toast.success("Getting questions from Canvas. This will take some time.")
    setTimeout(() => {
      toast.success("Redirecting back to the main page.");
      window.location = "/"
    }, 3000);
    var data = await getPPTQuestions();
    console.log(data);}


  const handleSpeak = async () => {
    await speak("Hello there. You are now on the Canvas screen. Please select your course and files from here!")
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Explorer</h1>
      <p className="italic text-gray-500 text-center">Logged into: <span className="underline">usm.instructure.com/saphalpdyl</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {courses.map((course) => (
                <Button
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  variant={selectedCourse?.id === course.id ? "default" : "outline"}
                  className="w-full mb-2 justify-start"
                >
                  {course.name}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              Course Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {courseFiles.length > 0 ? (
                courseFiles.map((file) => (
                  <Button
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    variant="outline"
                    className="w-full mb-2 justify-start"
                  >
                    {file.display_name}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground text-center">
                  {selectedCourse ? "No files available" : "Select a course to view files"}
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 text-center">
        <Button onClick={handleSpeak} className="inline-flex items-center">
          <Volume2 className="mr-2" />
          What is this all about ?
        </Button>
      </div>
    </div>
  )
}

