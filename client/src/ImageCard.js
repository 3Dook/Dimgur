import { useEffect, useState } from "react";
import axios from 'axios';
import './css/ImageCard.css';
const domain = "http://localhost:5001";


const ImgBar = (props)=>{

    const handleDeleteImg = async () => {
        try {
            const response = await axios({
                method: 'delete',
                url: domain + "/images/" + props.id,
                withCredentials: true,
            })
                .then((res)=>{
                    console.log('Sucess - img deleted', res.data)
                    window.location = "/account"; 
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
        } catch (error) {
            console.error(error.Message)
            
        }
    }

    const handleEditButton = async () =>{

    }
    
    return (
        <div>
            <button onClick={handleDeleteImg}>DELETE</button>
            <button onClick={()=>{
                window.location = '/edit/?id=' + props.id
            }}>EDIT IMAGE</button>
        </div>
        
    )
}




const ImageCard = (props) => {

    const [isAuth, setIsAuth] = useState(props.isAuth)
    const [data, setData] = useState({title: 'temp', description: 'tempDescript', date: Date(), owner: 'none'})

    const [imgSrc, setImgSrc] = useState('')

    const handleGetImg = async () =>{
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/images/data/" + props.id,
                withCredentials: true,
            })
                .then((res)=>{
                    //set data here
                    setData(res.data)
                    setImgSrc(domain + "/images/" + props.id)
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
    }, []);

    return (
      <div className="ImageCard" id={props.id}>
        {/* If is Auth add a delete, edit button else return the image */}
        {
            props.isAuth ?
            <ImgBar id={props.id}/>
            :
            null
        }
        <div className="imgDetails">
            <div>Title: {data.title}</div>
            <div>description: {data.description}</div>
            <div>Date: {data.date}</div>
            <div>Owner: {data.owner}</div>
        </div>
        <div className="imgContainer">
            <img src={imgSrc} alt="failedImg"/>
        </div>
      </div>
    );
  }
  
export default ImageCard;
  