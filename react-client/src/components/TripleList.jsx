import React from 'react';
import WineList from './WineList.jsx';

var TripleList = ({first, second, third, handleClickedProductEntry, postLike}) => (
  <div className='topItemsWrapper'>
    <div className='trendingWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={first}
        postLike={postLike}
        choice={postLike ? true : false}
      />
    </div>
    <div className='bestValueWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={second}
        postLike={postLike}
        choice={postLike ? true : false}
      />
    </div>

    <div className='UvasChoiceWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={third}
        postLike={postLike}
        choice={postLike ? true : false}
      />
    </div>
  </div>
);

export default TripleList;
