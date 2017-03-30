import React from 'react';
import {Link} from 'react-router-dom';

var WineListEntry = ({handleClickedProductEntry, wine}) => (
  <Link to='/product/overview'>
  <div
    className='productEntryFlexbox'
    onClick={() => { handleClickedProductEntry(wine) }}
  >
   <div className='entryFlexItem' >
     <h4>{wine.name}</h4>
     <p>Released: {wine.year}</p>
     <p>Best Price: ${wine.priceMin}</p>
   </div>
   <div className='entryFlexItem flexItemRight'>
     <p>Avg Rating: </p>
     <h4 className='entryRating'>{wine.apiRating/20}</h4>
   </div>
  </div>
  </Link>
);

export default WineListEntry;