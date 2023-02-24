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
        <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold uppercase">
                {props.loginSign}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

                <label>
                    <input type="text" name="username" 
                    className="usernameInput w-full bg-[transparent] border-b-2 border-[#c9c9c9] block h-7 my-4"
                    value={username} placeholder="USERNAME"
                    onChange={ e => setUserName(e.target.value)}/>
                </label>


                <label>
                    <input type="text" name="pw" 
                    className="pwInput bg-[transparent] border-b-2 border-[#c9c9c9] block h-7 my-4"
                    value={passW} placeholder="PASSWORD"
                    onChange={ e => setPassW(e.target.value)}/>
                </label>

                <input type="submit" value="Submit" className="submitInput shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8"/>
                
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
        <div className="bg-[#585858] mx-8 my-8 drop-shadow-lg border-[#585858] rounded-md px-2 py-2">

            <div className="close flex justify-between relative mb-8">
                <IconContext.Provider value={{ color: "black", size: "2em" }}>
                    <AiOutlineSwap onClick={handleSwapSection} className=''/>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <Link to={'/'}>
                            <AiOutlineClose />
                        </Link>
                </IconContext.Provider>
            </div>
        
            <div className="">

            {
                showLogin ?
                <SignUpCard loginSign="login"/>
                :
                <SignUpCard loginSign="register"/>
            }
            </div>
            


        </div>

    )
}

export default SignUp;