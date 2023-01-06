import React, {useState} from 'react'

function Home() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) =>{
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  // method to use the update search input to find images or details

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
      </div>
    </div>
  );
}

export default Home;
