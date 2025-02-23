"use server";

export default async function getCourses() {
    const APItoken = process.env.NEXT_PUBLIC_CANVAS_API_TOKEN;
    const coursePath = process.env.NEXT_PUBLIC_CANVAS_LINK + "courses/";
    const response = await fetch(
        coursePath, 
        {
            headers: {
                Authorization: `Bearer ${APItoken}`
            }
        }

    );
    const data = await response.json();
    return data;
}