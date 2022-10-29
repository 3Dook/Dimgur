import { useState } from "react";

import axios from 'axios';

const domain = "http://localhost:5001";

function Museum() {
    const [displayCollection, setDisplayCollection] = useState(true)
    const [title, setTitle] = useState('TITLE')
    const [description, setDescription] = useState("This is an description of an image")
    const [fileImage, setFileImage] = useState()

    const handleFileUpload = e =>{
        setFileImage(e.target.files[0])

    }

    const handleImageSubmit = async (e) =>{
        e.preventDefault();
        console.log(fileImage)
        try {
            let formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('productImage', fileImage)
            const response = await axios({
                method: 'post',
                url: domain + "/images",
                data: formData,
                withCredentials: true,
/*                 headers: {
                    'content-type': 'multipart/form-data' // do not forget this 
                   } */
            })
                .then((res)=>{
                    console.log(res.data)
                    window.location = "/account"; 
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.message)
            
        }
    }

    /* useEffect to loop through each of the collection */
    return (
      <div className="Museum">
        <div className="collection">
            X - Edit
            IMAGE

        </div>
        <div className="collectionForm">
            <form onSubmit={handleImageSubmit}>
                <label>
                    <div className="titleLabel">TITLE</div>
                    <input type="text" name="title" 
                    className="titleInput"
                    value={title} 
                    onChange={ e => setTitle(e.target.value)}/>
                </label>


                <label>
                    <div className="descriptionLabel">DESCRIPTION</div>
                    <input type="text" name="description" 
                    className="descriptionInput"
                    value={description} 
                    onChange={ e => setDescription(e.target.value)}/>
                </label>

                <label>
                    <div className="fileUploadLabel">FILE UPLOAD</div>
                    <input type="file" name="productImage"
                    className="productImageInput"
                    onChange={handleFileUpload}/>
                </label>

                <div>
                <input type="submit" value="Submit" className="submitInput" />
                </div>

            </form>
        </div>
      </div>
    );
  }
  
export default Museum;
  