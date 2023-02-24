import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import {AiOutlineClose, AiOutlineSwap} from 'react-icons/ai';
import axios from 'axios';

const domain = "http://localhost:5001/user";


const SignUpCard = (props) => {
    const [username, setUserName] = useState("")
    const [passW, setPassW] = useState("")

    const loginSignCard = props.loginSign;
    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: domain + "/" + loginSignCard,
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
                    window.location = "/signup"
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.message)
            
        }
    }

    return (
        <div className="bg-[#585858]">
            <h1>
                {props.loginSign}
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

                <input type="submit" value="Submit" className="submitInput"/>
                
            </form>
        </div>
    )
}


const SignUp = () => {

    const [showLogin, setShowLogin] = useState(true)

    const handleSwapSection = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin)
    }

    return (
        <div className="signup">

            <div className="close">
                <IconContext.Provider value={{ color: "black", size: "2em" }}>
                    <AiOutlineSwap onClick={handleSwapSection} />
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <Link to={'/'}>
                            <AiOutlineClose />
                        </Link>
                </IconContext.Provider>
            </div>
        
            <div className="swapSection">

            {
                showLogin ?
                <SignUpCard loginSign="register"/>
                :
                <SignUpCard loginSign="login"/>
            }
            </div>
            


        </div>

    )
}

export default SignUp;