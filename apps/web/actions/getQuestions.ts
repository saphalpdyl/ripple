"use server";

import axios from "axios";

export async function getPPTQuestions() {
    try {
        console.log("Sending Request to Extractor PPT")
        const { data } = await axios.post(
          "https://ripple-official-506350199040.us-central1.run.app/extractorppt",
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        console.log("Response data:", data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message)
        } else {
          console.error("Error:", error)
        }
      }
   
}
