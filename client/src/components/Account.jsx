import React, { useEffect, useState } from "react";
import axios from "axios";

import ImageCard from "./ImageCard";
const domain = process.env.REACT_APP_DOMAIN || "http://localhost:5001";

function Account(props) {
  const [user, setUser] = useState({ id: 0, username: "temp", museum: [] });
  const [collection, setCollection] = useState([]);

  const handleAccount = async () => {
    try {
      const response = await axios({
        method: "get",
        url: domain + "/user/account",
        withCredentials: true,
      })
        .then((res) => {
          /*                     console.log(res.data, "account") */
          setUser(res.data.payload);
          setCollection(res.data.payload.museum);
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
      /*             window.location = "/";  */
    } catch (error) {
      console.error(error.Message);
    }
  };

  const handleAccount3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: domain + "/user/account",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data, "account");
          setUser(res.data.payload);
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
      /*             window.location = "/";  */
    } catch (error) {
      console.error(error.Message);
    }
  };

  const handleAccountDeletion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "delete",
        url: domain + "/user/account",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          console.log("user deleted");
          window.location = "/";
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
    } catch (error) {
      console.error(error.Message);
    }
  };

  useEffect(() => {
    handleAccount();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-black self-center">
        {user.username}'s Account
      </h1>
      <div className="underline self-center">{user.id}</div>

      <form onSubmit={handleAccountDeletion} className="self-center">
        <input
          type="submit"
          value="DELETE USER"
          className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8"
        />
      </form>

      <div className="flex flex-wrap justify-around items-center">
        {collection.map((ElementId, key) => {
          return <ImageCard key={key} id={ElementId} isAuth={props.isAuth} />;
        })}
      </div>
      <div className="self-center">
        <button
          className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-8"
          onClick={() => {
            window.location = "/museum";
          }}
        >
          ADD IMAGE
        </button>
      </div>
    </div>
  );
}

export default Account;
