import React from 'react';
import WineList from './WineList.jsx';

var HomePageWines = ({topReds, topWhites, topRated, handleClickedProductEntry, postLike}) => (
  <div className='topItemsWrapper'>
    <div className='trendingWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topReds}
        postLike={postLike}
      />
    </div>
    <div className='bestValueWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topWhites}
        postLike={postLike}
      />
    </div>

    <div className='UvasChoiceWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topRated}
        postLike={postLike}
        choice={true}
      />
    </div>
  </div>
);

export default HomePageWines;
