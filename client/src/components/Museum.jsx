import { useState } from "react";
import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai';
import axios from 'axios';

const domain = "http://localhost:5001";

function Museum() {
    const [displayCollection, setDisplayCollection] = useState(true)
    const [title, setTitle] = useState('TITLE')
    const [description, setDescription] = useState("This is an description of an image")
    const [fileImage, setFileImage] = useState()
    const [msg, setMsg] = useState("")

    const handleFileUpload = e =>{
        setFileImage(e.target.files[0])

    }

    const handleImageSubmit = async (e) =>{
        e.preventDefault();


        if(!title || !description || !fileImage){
            setMsg("Failed to Upload - Please ensure Title, Description and File Images are properly entered.")
            return -1
        } 

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

    const closeMsg = () => {
        setMsg("")
    }

    /* useEffect to loop through each of the collection */
    return (
        <div className="w-full flex flex-col items-center">
            {
                msg.length > 0 ?
                <div className="bg-red-200 flex w-[80vw] flex rounded-md text-1xl">
                    <IconContext.Provider value={{ color: "black"}}>
                        <AiOutlineClose onClick={closeMsg} size={80} />
                    </IconContext.Provider>
                    {msg}
                </div>
                :
                null
            }
            <div className="w-[80%] bg-[#f6f6f6] m-7 flex flex-col">
                <div className="collection text-3xl self-center my-6">
                    ADD NEW IMAGE
                </div>
                <div className="collectionForm w-full">
                    <form onSubmit={handleImageSubmit} className="w-full flex flex-col justify-center items-center">
                        <label className="w-full flex flex-col mb-4">
                            <div className="titleLabel ml-2 text-2xl">TITLE:</div>
                            <input type="text" name="title" 
                            className="titleInput w-[90%] self-center"
                            value={title} 
                            onChange={ e => setTitle(e.target.value)}/>
                        </label>

                        <label className="w-full flex flex-col">
                            <div className="descriptionLabel ml-2 text-2xl">DESCRIPTION: </div>
                            <textarea name="description" 
                            className="descriptionInput w-[90%] self-center"
                            value={description} 
                            onChange={ e => setDescription(e.target.value)}/>
                        </label>

                        <label className="mt-5">
                            <input type="file" name="productImage"
                            className="productImageInput"
                            onChange={handleFileUpload}/>
                        </label>

                        <div>
                        <input type="submit" value="Submit" className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
  }
  
export default Museum;
  