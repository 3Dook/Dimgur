import React, {useState, useEffect} from 'react'
import axios from 'axios';

import './css/Home.css';
import ImageCard from "./ImageCard";

const domain = "http://localhost:5001";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [collection, setCollection] = useState([])

  const handleSearchChange = (e) =>{
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  // method to use the update search input to find images or details
  const handleHomeSearch = async() =>{
      try {
          const response = await axios({
              method: 'get',
              url: domain + "/images/search",
              withCredentials: true,
          })
              .then((res)=>{
                  let payload = []
                  for(const each in res.data.result){
                    payload.push(res.data.result[each]._id)
                  }
                  setCollection(payload)
              })
              .catch((e)=>{
                  console.log("failed - ", e.response.data.message)
              })
      } catch (error) {
          console.error(error.Message)
          
      }
  }
  
    useEffect(()=>{
        handleHomeSearch();
    }, []);

  return (
    <div className="">
        Home
      <div>
        <input 
          className='searchBar'
          type="text"
          placeholder='Search Here'
          onChange={handleSearchChange}
          value={searchInput}
        />
        <div>{searchInput}</div>
      </div>
      <div>
        Images content cards go here
        <div className='ImageCollections'>
{/*             Collection:  */}
            {
            collection.map((ElementId, key)=>{
                return(
                    <ImageCard key={key} id={ElementId} /> 
                )
            })
            }
        </div>
      </div>
    </div>
  );
}

export default Home;
