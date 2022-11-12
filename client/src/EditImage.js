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
        <div>
            EDITing in progress
            <div className="collectionForm">
            <div>
                <div>USER INFO</div>
                <div className="imgContainer">
                    <img src={imgSrc} alt="failedImg"/>
                </div>
            </div>
            <form onSubmit={handleImageEdit}>
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

                <div>
                <input type="submit" value="Submit" className="submitInput" />
                </div>

            </form>
        </div>
        </div>
    )
}

export default EditImage;