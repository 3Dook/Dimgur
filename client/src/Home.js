import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {BsSearch} from 'react-icons/bs'
import ImageCard from "./components/ImageCard";

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
    <div className="flex flex-col">
      
      <div className='w-[80%] self-center bg-[#f6f6f6] rounded-md flex items-center'>
        <input 
          className='searchBar flex-1 bg-[transparent] h-12'
          type="text"
          placeholder='Search Here'
          onChange={handleSearchChange}
          value={searchInput}
        />
        <BsSearch size={30}/>
      </div>
      <div>
        <div className='flex flex-wrap justify-around items-center'>
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
