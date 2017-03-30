import React from 'react';
import TopRedsList from './topRedsList.jsx';
import TopWhitesList from './topWhitesList.jsx';
import UvasChoiceWineList from './uvasChoiceWineList.jsx';


class HomepageWines extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='topItemsWrapper'>
        <div className='trendingWineListWrapper'>
          <TopRedsList handleClickedProductEntry={this.props.handleClickedProductEntry} topReds = {this.props.topReds}/>
        </div>
        <div className='bestValueWineListWrapper'>
          <TopWhitesList handleClickedProductEntry={this.props.handleClickedProductEntry} topWhites={this.props.topWhites}/>
        </div>

        <div className='UvasChoiceWineListWrapper'>
          <UvasChoiceWineList handleClickedProductEntry={this.props.handleClickedProductEntry} topRated={this.props.topRated}/>
        </div>
      </div>
    )
  }
};

export default HomepageWines;
