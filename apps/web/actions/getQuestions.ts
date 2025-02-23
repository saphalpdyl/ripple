// just do a get post request to the local server from NEXT_DOCUMENT_SERVER_URL/extrac

export default async function getQuestions(file : any) {
    var path = "";
    if (file.display_name.endsWith('.ppt')) {
        path = "https://ripple-official-506350199040.us-central1.run.app/extractorppt";
    } else {
        return [];
    }

    console.log("Getting questions...")
    const response = await fetch(
       path, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({}) // Empty object for testing

        }
    );
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    const data = await response.json();
    console.log(data);
    return data;
}