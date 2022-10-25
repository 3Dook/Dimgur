import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai';
/* import './signup.css'; */
import axios from 'axios';

const domain = "http://localhost:5001/user";


const SignUp = () => {

    const [username, setUserName] = useState("")
    const [passW, setPassW] = useState("")

    const [lusername, setlUserName] = useState("")
    const [lpassW, setlPassW] = useState("")

    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: domain + "/register",
                withCredentials: true,
                data: {
                    username: username,
                    password: passW
                }
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

    const handleLogin = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: domain + "/login",
                withCredentials: true,
                data: {
                    username: lusername,
                    password: lpassW
                }
            })
                .then((res)=>{
                    console.log(res.data)
/*                     window.location = "/account";  */
                })
                .catch((e)=>{
                    console.log(e)
                    console.log("failed - ", e.response.data)
                    
                    window.location = "/signup"
                })
        } catch (error) {
            console.error(error.Message)
            
        }
    }

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
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.Message)
            
        }
    }

    const handleLogOut = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: domain + "/logout",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
            window.location = "/"; 
        } catch (error) {
            console.error(error.Message)
            
        }
    }
    return (
        <div className="signup">

            <div className="close">
                <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <Link to={'/'}>
                            <AiOutlineClose />
                        </Link>
                </IconContext.Provider>
            </div>
            
            <h1>
                SIGN UP
            </h1>

            <form onSubmit={handleSubmit}>

                <label>
                    <div className="userNameLabel">User Name</div>
                    <input type="text" name="username" 
                    className="usernameInput"
                    value={username} 
                    onChange={ e => setUserName(e.target.value)}/>
                </label>


                <label>
                    <div className="pwLabel">Password</div>
                    <input type="text" name="pw" 
                    className="pwInput"
                    value={passW} 
                    onChange={ e => setPassW(e.target.value)}/>
                </label>

                <input type="submit" value="Submit" className="submitInput" />
                
            </form>

        <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>

                <label>
                    <div className="userNameLabel">User Name</div>
                    <input type="text" name="lusername" 
                    className="usernameInput"
                    value={lusername} 
                    onChange={ e => setlUserName(e.target.value)}/>
                </label>


                <label>
                    <div className="pwLabel">Password</div>
                    <input type="text" name="lpw" 
                    className="pwInput"
                    value={lpassW} 
                    onChange={ e => setlPassW(e.target.value)}/>
                </label>

                <input type="submit" value="Submit" className="submitInput" />
                
            </form>


        </div>

    )
}

export default SignUp;