// just do a get post request to the local server from NEXT_DOCUMENT_SERVER_URL/extrac

export default async function getQuestions(file : any) {
    var path = "";
    if (file.display_name.endsWith('.pdf')) {
        path = process.env.NEXT_PUBLIC_DOCUMENT_SERVER_URL + "extractpdf";
    } else if (file.display_name.endsWith('.ppt')) {
        path = process.env.NEXT_PUBLIC_DOCUMENT_SERVER_URL + "extractppt";
    } else {
        return [];
    }


    const response = await fetch(
       path, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const data = await response.json();
    console.log(data);
    return data;
}