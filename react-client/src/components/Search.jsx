import React from 'react';
import SearchBar from './SearchBar';

const Search = (props) => {
  <div>
    <div className = 'heroContentWrapper'>
      <h2>Unbiased wine reviews</h2>
      <SearchBar className ='SearchBar' search = {props.search}/>
    </div>
  </div>
}

export default Search;