"use server";

export default async function getFiles(courseID: number) {
    const APItoken = process.env.NEXT_PUBLIC_CANVAS_API_TOKEN;
    const coursePath = process.env.NEXT_PUBLIC_CANVAS_LINK + "courses/" + courseID + "/files/";
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