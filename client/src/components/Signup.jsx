import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineSwap } from "react-icons/ai";
import axios from "axios";

const domain = process.env.REACT_APP_DOMAIN || "http://localhost:5001";

const SignUpCard = (props) => {
  const [username, setUserName] = useState("");
  const [passW, setPassW] = useState("");

  const loginSignCard = props.loginSign;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // makesure all the validation passes before sending to claim

    if (
      (!vLower || !vUpper || !vNumber || !vMin) &&
      props.loginSign != "login"
    ) {
      return -1;
    }

    try {
      const response = await axios({
        method: "post",
        url: domain + "/user/" + loginSignCard,
        withCredentials: true,
        data: {
          username: username,
          password: passW,
        },
      })
        .then((res) => {
          console.log(res.data);
          window.location = "/account";
        })
        .catch((e) => {
          /*RETURN ERROR FOR MESSAGE*/
          /*                     window.location = "/signup" */
          if (props.loginSign == "login") {
            console.log(e.message);
            props.changeMsg(e.message);
          } else {
            console.log("failed - ", e.response.data.message);
            props.changeMsg(e.response.data.message);
          }
        });
      /*             window.location = "/";  */
    } catch (error) {
      console.error(error.message);
      props.changeMsg(e.response.data.message);
    }
  };

  const [vLower, setVlower] = useState(false);
  const [vUpper, setVUpper] = useState(false);
  const [vNumber, setVNumber] = useState(false);
  const [vMin, setVMin] = useState(false);
  const handlePasswordChange = (e) => {
    setPassW(e.target.value);

    if (passW.match(/[a-z]/)) {
      setVlower(true);
    } else {
      setVlower(false);
    }

    if (passW.match(/[A-Z]/)) {
      setVUpper(true);
    } else {
      setVUpper(false);
    }

    if (passW.match(/[0-9]/)) {
      setVNumber(true);
    } else {
      setVNumber(false);
    }

    if (passW.length > 7) {
      setVMin(true);
    } else {
      setVMin(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <h1 className="text-3xl font-bold uppercase">{props.loginSign}</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <label>
          <input
            type="text"
            name="username"
            className="usernameInput w-full bg-[transparent] border-b-2 border-[#c9c9c9] block h-7 my-4"
            value={username}
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label>
          <input
            type="password"
            name="pw"
            className="pwInput bg-[transparent] border-b-2 border-[#c9c9c9] block h-7 my-4"
            value={passW}
            placeholder="PASSWORD"
            onChange={handlePasswordChange}
          />
        </label>

        {props.loginSign == "login" ? null : (
          <div id="message">
            <h3>Password must contain the following:</h3>
            <p
              id="letter"
              className={vLower ? "text-green-400" : "text-red-400"}
            >
              A <b>lowercase</b> letter
            </p>
            <p
              id="capital"
              className={vUpper ? "text-green-400" : "text-red-400"}
            >
              A <b>capital (uppercase)</b> letter
            </p>
            <p
              id="number"
              className={vNumber ? "text-green-400" : "text-red-400"}
            >
              A <b>number</b>
            </p>
            <p id="length" className={vMin ? "text-green-400" : "text-red-400"}>
              Minimum <b>8 characters</b>
            </p>
          </div>
        )}

        <input
          type="submit"
          value="Submit"
          className="submitInput shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8"
        />
      </form>
    </div>
  );
};

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwapSection = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
  };

  const [msg, setMsg] = useState("");

  const closeMsg = () => {
    setMsg("");
  };

  return (
    <div className="flex flex-col items-center">
      {msg.length > 0 ? (
        <div className="bg-red-200 flex w-[80vw] flex justify-between  rounded-md text-2xl">
          {msg}
          <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <AiOutlineClose onClick={closeMsg} />
          </IconContext.Provider>
        </div>
      ) : null}

      <div className="w-[80vw] bg-[#585858] mx-8 my-8 drop-shadow-lg border-[#585858] rounded-md px-2 py-2">
        <div className="close flex justify-between relative mb-8">
          <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <AiOutlineSwap onClick={handleSwapSection} className="" />
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "black", size: "2em" }}>
            <Link to={"/"}>
              <AiOutlineClose />
            </Link>
          </IconContext.Provider>
        </div>
        <div className="">
          {showLogin ? (
            <SignUpCard
              loginSign="login"
              changeMsg={(value) => setMsg(value)}
            />
          ) : (
            <SignUpCard
              loginSign="register"
              changeMsg={(value) => setMsg(value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
