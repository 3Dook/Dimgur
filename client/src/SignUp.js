import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import {AiOutlineClose} from 'react-icons/ai';
/* import './signup.css'; */


const domain = "http://localhost:5001/api";


const SignUp = () => {

    const [email, setEmail] = useState("")
    const [passW, setPassW] = useState("")

    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const body = {blah: email, foo: passW}
            const response = await fetch(domain,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"; 
        } catch (error) {
            console.error(error.message)
            
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
                    <div className="emailLabel">email</div>
                    <input type="text" name="email" 
                    className="emailInput"
                    value={email} 
                    onChange={ e => setEmail(e.target.value)}/>
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
        </div>

    )
}

export default SignUp;