import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import ImageCard from "./components/ImageCard";
const domain = "http://localhost:5001";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [collection, setCollection] = useState([]);
  const max = 10;
  const index = 1;
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // method to use the update search input to find images or details
  const handleHomeSearch = async (e) => {
    e.preventDefault();
    if (searchInput === "") {
      handleHomeSearchAll();
      return;
    }

    try {
      const response = await axios({
        method: "get",
        url: domain + "/images/search/" + max + "/" + index + "/" + searchInput,
        withCredentials: true,
      })
        .then((res) => {
          let payload = [];
          for (const each in res.data.result) {
            payload.push(res.data.result[each]._id);
          }
          setCollection(payload);
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
    } catch (error) {
      console.error(error.Message);
    }
  };
  // method to use the update search input to find images or details
  const handleHomeSearchAll = async () => {
    try {
      const response = await axios({
        method: "get",
        url: domain + "/images/search/" + max + "/" + index + "/*",
        withCredentials: true,
      })
        .then((res) => {
          let payload = [];
          for (const each in res.data.result) {
            payload.push(res.data.result[each]._id);
          }
          setCollection(payload);
        })
        .catch((e) => {
          console.log("failed - ", e.response.data.message);
        });
    } catch (error) {
      console.error(error.Message);
    }
  };

  useEffect(() => {
    handleHomeSearchAll();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[80%] self-center bg-[#f6f6f6] rounded-md flex items-center">
        <form
          onSubmit={handleHomeSearch}
          className="flex justify-center items-center w-full"
        >
          <input
            className="searchBar flex-1 bg-[transparent] h-12"
            type="text"
            placeholder="Search Here"
            onChange={handleSearchChange}
            value={searchInput}
          />
          <button type="submit" value="Submit" className="mx-3">
            <BsSearch size={30} />
          </button>
        </form>
      </div>
      <div>
        <div className="flex flex-wrap justify-around items-center">
          {/*             Collection:  */}
          {collection.map((ElementId, key) => {
            return <ImageCard key={key} id={ElementId} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
