 
import axios from "axios"

const aws = async (img) => {
    console.log(img,"image");
    let imageUrl = null;
    await axios.get("http://localhost:4000/api/user/get-upload-url").then(async ({ data: uploadurl }) => {
        console.log(uploadurl.uploadurl);
       await axios({
            method:"PUT",
            url: uploadurl.uploadurl,
            headers: { 'Content-Type': 'image/jpg', },
            body:img
        }).then(() => {
            imageUrl = uploadurl.uploadurl.split("?")[0]
            console.log(imageUrl,"osfd");
        })
           .catch((err) => {
                console.log(err);
            })
    }
         
    )
    return imageUrl;
}

export default aws

// import axios from 'axios';

// const aws = async (img) => {
//     let imageUrl = null;
    
//     try {
//         const { data: uploadurl } = await axios.get("http://localhost:4000/api/user/get-upload-url");
//         console.log("Upload URL:", uploadurl.uploadurl);
        
//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         };

//         const response = await axios.put(uploadurl.uploadurl, img, config);
//         console.log("Upload Successful");
//         console.log("Response:", response.data);
        
//         imageUrl = uploadurl.split("?")[0];
//     } catch (error) {
//         console.error("Upload failed:", error);
//     }

//     return imageUrl;
// }

// export default aws;
