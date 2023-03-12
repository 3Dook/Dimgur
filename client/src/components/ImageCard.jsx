import { React, useEffect, useState } from "react";
import axios from "axios";
const domain = "http://localhost:5001";

const ImgBar = (props) => {
  const handleDeleteImg = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: domain + "/images/" + props.id,
        withCredentials: true,
      })
        .then((res) => {
          console.log("Sucess - img deleted", res.data);
          window.location = "/account";
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
    } catch (error) {
      console.error(error.Message);
    }
  };

  const handleEditButton = async () => {};

  return (
    <div className="flex justify-between">
      <button
        onClick={handleDeleteImg}
        className="shadow bg-red-400 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2 mb-2 ml-2"
      >
        DELETE
      </button>
      <button
        onClick={() => {
          window.location = "/edit/?id=" + props.id;
        }}
        className="shadow bg-yellow-400 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2 mb-2 mr-2"
      >
        EDIT IMAGE
      </button>
    </div>
  );
};

const ImageCard = (props) => {
  const [isAuth, setIsAuth] = useState(props.isAuth);
  const [data, setData] = useState({
    title: "temp",
    description: "tempDescript",
    date: Date(),
    owner: "none",
  });

  const [imgSrc, setImgSrc] = useState("");

  const handleGetImg = async () => {
    try {
      const response = await axios({
        method: "get",
        url: domain + "/images/data/" + props.id,
        withCredentials: true,
      })
        .then((res) => {
          //set data here
          setData(res.data);
          setImgSrc(domain + "/images/" + props.id);
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
      /*             window.location = "/";  */
    } catch (error) {
      console.error(error.Message);
    }
  };

  useEffect(() => {
    handleGetImg();
  }, []);

  return (
    <div
      className="flex flex-col aspect-square bg-gray-100 mt-8 mx-8 drop-shadlow-lg border-solid border-[#585858] rounded-md hover:scale-[1.15] ease-in-out duration-300
        md:w-[calc(45%-2.5em)]
        lg:w-[25%]"
      id={props.id}
    >
      <div className="imgDetails flex flex-col">
        <div className="self-center font-bold text-2xl">{data.title}</div>
        <div>"{data.description}"</div>
        <div>{data.date}</div>
        <div>Owner: {data.owner}</div>
      </div>

      <img
        src={imgSrc}
        alt="failedImg"
        className="flex-1 w-full object-cover
            lg:h-[50%]"
      />
      <button
        onClick={() => {
          window.location = domain + "/images/" + props.id;
        }}
        className="shadow self-center bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2 mb-2 mr-2"
      >
        VIEW
      </button>
      {/* If is Auth add a delete, edit button else return the image */}
      {props.isAuth ? <ImgBar id={props.id} /> : null}
    </div>
  );
};

export default ImageCard;
