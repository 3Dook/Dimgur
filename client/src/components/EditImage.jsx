import { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

const domain = "http://localhost:5001";

function EditImage(){
    const [data, setData] = useState({title: 'temp', description: 'tempDescript', date: Date(), owner: 'none'})
    const [imgSrc, setImgSrc] = useState('')
    const [title, setTitle] = useState("temp")
    const [description, setDescription] = useState("tempDescription")
    const [searchParams] = useSearchParams();
    const imgId = searchParams.get('id');

    const handleImageEdit = async (e) =>{
        e.preventDefault();
        try {

            const response = await axios({
                method: 'patch',
                url: domain + "/images/" + imgId,
                data: {
                    title: title,
                    description: description
                },
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

    const handleGetImg = async () =>{
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/images/data/" + imgId,
                withCredentials: true,
            })
                .then((res)=>{
                    //set data here
                    setData(res.data)
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    setImgSrc(domain + "/images/" + imgId)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.Message)
            
        }
    }

    useEffect(()=>{
        handleGetImg();
    }, [])
    return(
        <div className="flex flex-col bg-gray-300 m-2 rounded-md justify-between">
            <h1 className="text-3xl font-black self-center mt-4">
                Editing in progress
            </h1>
            <div className="imgContainer self-center my-4">
                <img src={imgSrc} alt="failedImg"/>
            </div>
            <form onSubmit={handleImageEdit} className="flex flex-col w-full leading-8 mx-2">
                <label className="flex w-full my-2">
                    <div className="titleLabel text-2xl">TITLE: </div>
                    <input type="text" name="title" 
                    className="titleInput flex-1 ml-4 rounded-sm mr-4"
                    value={title} 
                    onChange={ e => setTitle(e.target.value)}/>
                </label>

                <label className="w-full flex flex-col">
                    <div className="descriptionLabel text-2xl">DESCRIPTION</div>
                    <textarea name="description" 
                    className="descriptionInput rounded-sm mr-4"
                    value={description} 
                    onChange={ e => setDescription(e.target.value)}/>
                </label>

                <div className="self-center">
                    <input type="submit" value="SAVE" className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8" />
                </div>

            </form>
        </div>
    )
}

export default EditImage;