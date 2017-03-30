import React from 'react';

var WineListEntry = ({handleClickedProductEntry, wine}) => (
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
);

export default WineListEntry;