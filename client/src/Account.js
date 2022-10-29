import React, {useEffect, useState } from "react";
import axios from 'axios';

import ImageCard from "./ImageCard";

const domain = "http://localhost:5001/user";

function Account(props) {

    const [user, setUser] = useState({id: 0, username: "temp", museum: []})
    const [collection, setCollection] = useState([])
    const handleAccount = async() =>{
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/account",
                withCredentials: true,
            })
                .then((res)=>{
/*                     console.log(res.data, "account") */
                    setUser(res.data.payload)
                    setCollection(res.data.payload.museum)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.Message)
            
        }
    }

    const handleAccount3 = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/account",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data, "account")
                    setUser(res.data.payload)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.Message)
            
        }
    }

    const handleAccountDeletion = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'delete',
                url: domain + "/account",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data)
                    console.log("user deleted")
                    window.location = "/"; 
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
        } catch (error) {
            console.error(error.Message)
        }
    }

    useEffect(()=>{
        handleAccount();
    }, []);

    return (
      <div className="">
          <h1>Account</h1>
          <form onSubmit={handleAccount3}>
              <input type="submit" value="Submit" className="submitInput" />
          </form>
        
          <form onSubmit={handleAccountDeletion}>
              <input type="submit" value="DELETE" className="submitInput" />
          </form>

        <div>USERNAME: {user.username} - {user.id}</div>
        <div>
            Collection: 
            {
            collection.map((ElementId, key)=>{
                return(
                    <ImageCard key={key} id={ElementId} isAuth={props.isAuth}/>
                )
            })
            }
        </div>
        <div>
            <button onClick={()=>{
                window.location = '/museum'
            }}>ADD IMAGE</button>
        </div>
      </div>
    );
  }
  
  export default Account;
  