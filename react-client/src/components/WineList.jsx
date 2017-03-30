import React from 'react';
import WineListEntry from './WineListEntry.jsx';

var WineList = ({handleClickedProductEntry, wines}) => (
  <div className='bestCategory trendingCategory'>
    <ol>
      {wines.map(wine =>
        <li key={wine._id}>
          <WineListEntry
            handleClickedProductEntry={handleClickedProductEntry}
            wine={wine}
          />
        </li>
      )}
    </ol>
  </div>
);

export default WineList;