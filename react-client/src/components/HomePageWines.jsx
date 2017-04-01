import React from 'react';
import WineList from './WineList.jsx';

var HomePageWines = ({topReds, topWhites, topRated, handleClickedProductEntry, postLike}) => (
  <div className='topItemsWrapper'>
    <div>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topReds}
      />
    </div>
    <div>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topWhites}
      />
    </div>

    <div>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topRated}
        postLike={postLike}
      />
    </div>
  </div>
);

export default HomePageWines;
