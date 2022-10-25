import React, {useEffect, useState } from "react";
import axios from 'axios';

const domain = "http://localhost:5001/user";

function Account() {

    const [user, setUser] = useState({id: 0, username: "temp", museum: []})

    const handleAccount = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/account",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data)
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

    return (
      <div className="">
          <h1>Account</h1>
          <form onSubmit={handleAccount}>
              <input type="submit" value="Submit" className="submitInput" />
          </form>
        
          <form onSubmit={handleAccountDeletion}>
              <input type="submit" value="DELETE" className="submitInput" />
          </form>

        <div>USERNAME: {user.username} - {user.id}</div>
        <div>Collection: {user.collection}</div>
        <div>Button to add</div>
      </div>
    );
  }
  
  export default Account;
  