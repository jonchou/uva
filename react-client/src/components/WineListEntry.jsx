import React from 'react';
import {Link} from 'react-router-dom';

class WineListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeClass: '',
      dislikeClass: ''
    };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(event) {
    console.log(event.target.value);
    if (event.target.value === 'Like') {
      var newState = this.state.likeClass === '' ? 'selected' : '';
      this.setState({
        likeClass: newState
      });
    } else {
      var newState = this.state.dislikeClass === '' ? 'selectedDislike' : '';
      this.setState({
        dislikeClass: newState
      });
    }
  }

  handleButtonClick(event, likeOrDislike) {
    // TODO: depending on the state, call postLike or updateLike? to update prefs of user
    this.props.postLike(this.props.wine, likeOrDislike);
    this.toggleState(event);
  }

  render() {
    return (
      <div className='productEntryFlexbox'>
      <Link to='/product/overview'>
        <div className='entryFlexItem' onClick={() => { this.props.handleClickedProductEntry(this.props.wine) }} >
          <h4>{this.props.wine.name}</h4>
          <p>Released: {this.props.wine.year}</p>
          <p>Best Price: ${this.props.wine.priceMin}</p>
        </div>
      </Link>
        <div className='flexItemRight'>
          <h4>Rating: {this.props.wine.apiRating/20}</h4>
          {this.props.postLike && (
            <div>
              <input
                className={this.state.likeClass}
                type="button"
                value="Like"
                onClick={(event) => { this.handleButtonClick(event, 1) }}
              />
              <input
                className={this.state.dislikeClass}
                type="button"
                value="Dislike"
                onClick={(event) => { this.handleButtonClick(event, 0) }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WineListEntry;