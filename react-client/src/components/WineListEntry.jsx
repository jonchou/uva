import React from 'react';
import {Link} from 'react-router-dom';

var WineListEntry = ({handleClickedProductEntry, wine, postLike}) => (
  <div className='productEntryFlexbox'>
  <Link to='/product/overview'>
    <div className='entryFlexItem' onClick={() => { handleClickedProductEntry(wine) }} >
      <h4>{wine.name}</h4>
      <p>Released: {wine.year}</p>
      <p>Best Price: ${wine.priceMin}</p>
    </div>
  </Link>
    <div className='flexItemRight'>
      <h4>Rating: {wine.apiRating/20}</h4>
      {postLike && (
        <div>
          <input type="button" value="Like" onClick={() => {postLike(wine, 1)}} />
          <input type="button" value="Dislike" onClick={() => {postLike(wine, 0)}} />
        </div>
      )}
    </div>
  </div>
);

export default WineListEntry;