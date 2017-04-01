import React from 'react';
import WineListEntry from './WineListEntry.jsx';

var WineList = ({handleClickedProductEntry, wines, postLike}) => (
  <div className='bestCategory'>
    <ol>
      {wines && wines.map(wine =>
        <li key={wine._id}>
          <WineListEntry
            handleClickedProductEntry={handleClickedProductEntry}
            wine={wine}
            postLike={postLike}
          />
        </li>
      )}
    </ol>
  </div>
);

export default WineList;