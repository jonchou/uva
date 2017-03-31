import React from 'react';
import SearchBar from 'react';

const Search = (props) => {
  <div className = 'heroImageContainer'>
    <div className = 'heroContentWrapper'>
      <h2>Unbiased wine reviews</h2>
      <SearchBar className ='SearchBar' search = {props.search}/>
    </div>
  </div>
}

export default Search;