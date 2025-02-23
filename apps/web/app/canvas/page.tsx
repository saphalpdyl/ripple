"use client";

import { useEffect, useState } from "react";
import getCourses from "@/actions/courses";
import getFiles from "@/actions/getFiles";
import getQuestions from "@/actions/getQuestions";

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
  } from "@/components/ui/dropdown-menu";
  


// Add type for your course data
interface Course {
  // Add your course properties here
  id: number;
  name: string;
  // ... other properties
}

interface File {
    // Add your file properties here
    id: number;
    display_name: string;
    url: string;
    // ... other properties
    }

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courseFiles, setCourseFiles] = useState<File[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handelCourseClick = (course: Course) => {
        return async () => {
            try {
                const files = await getFiles(course.id);

                for (const file of files) {
                    if (file.display_name.endsWith('.pdf') || file.display_name.endsWith('.ppt')) {
                        setCourseFiles((prevFiles) => [...prevFiles, file]);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
    }

    const handelFileClick = (file: File) => {
        return async () => {
            var questions = getQuestions(file);
            console.log(questions);
        };
    };



    return (
        <div>
            <div className="mt-5 flex flex-col gap-2 items-center">
                {courses.map((course) => (
                    <div key={course.id}>
                        <Button onClick={handelCourseClick(course)}>{course.id}: {course.name} </Button>
                    </div>
                ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 items-center justify-center">
                <DropdownMenu>
                    <div className="pl-4 space-y-2 ">
                        {courseFiles.map((file) => (
                            <div key={file.id} className="flex items-center space-x-2">
                                <Button
                                    onClick={handelFileClick(file)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {file.display_name}
                                </Button>
                            </div>
                        ))}
                    </div>
                </DropdownMenu>
            </div>
        </div>
    );
}