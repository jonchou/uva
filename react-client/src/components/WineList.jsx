import React from 'react';
import WineListEntry from './WineListEntry.jsx';

var WineList = ({handleClickedProductEntry, wines, postLike, choice}) => (
  <div className='bestCategory'>
    <ul>
      {wines && wines.map(wine =>
        <li key={wine._id}>
          <WineListEntry
            handleClickedProductEntry={handleClickedProductEntry}
            wine={wine}
            postLike={postLike}
            choice={choice}
          />
        </li>
      )}
    </ul>
  </div>
);

export default WineList;