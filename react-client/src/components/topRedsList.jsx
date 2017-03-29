import React from 'react';
import TopRedsEntry from './topRedsEntry.jsx';

class TopRedsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='bestCategory trendingCategory'>
        <h2>
          Top Reds
        </h2>
        <hr/>
        <ol>
          {this.props.topReds.map(topRed =>
            <li key={topRed._id}>
              <TopRedsEntry
                handleClickedProductEntry={this.props.handleClickedProductEntry}
                topRed={topRed}
              />
            </li>)}
        </ol>
      </div>
            // {/* <div>{this.state.maxRatingWines}</div> */}
            // <ul>
            //   {this.state.topRedss.map(topReds =>
            //     <li key={topReds.id}><topRedsEntry topReds={topReds} onClick={this.handleUserWantstopReds}/></li>
            //   )}
            // </ul>
    );
  }
}

export default TopRedsList;
