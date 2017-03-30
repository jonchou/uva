import React from 'react';
import Search from './SearchBar.jsx';
import TopWine from './topWines.jsx';
import $ from 'jquery';
import Login from './loginForm.jsx';
import ProductList from './productList.jsx';
import TopBar from './TopBar.jsx';
import ProductOverview from './productOverview.jsx';
import Questionnaire from './Questionnaire.jsx';
import HomepageWines from './HomepageWines.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      reviews: [],
      topReds: [],
      topWhites: [],
      topRated: [],
      uvasChoice: [],
      searchQuery: '',
      searchHistory: [],
      userHasSearched: false,
      userWantsLogin: false,
      userLoggedIn: false,
      userWantsHomePage: true,
      username: '',
      userID: '',
      invalidPasswordAttempt: false,
      invalidUsername: false,
      userWantsProductList: false,
      userClickedEntry: false,
      currentWine: null,
    }

    this.search = this.search.bind(this);
    this.showHomePageWines = this.showHomePageWines.bind(this);
    this.handleUserWantsHome = this.handleUserWantsHome.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.init = this.init.bind(this);
    this.handleUserWantsProductList = this.handleUserWantsProductList.bind(this);
    this.handleClickedProductEntry = this.handleClickedProductEntry.bind(this);
    this.showProductsList = this.showProductsList.bind(this);
  }

  componentDidMount(){
    this.init();
  }

  handleUserWantsHome(event) {
    this.setState({
      userWantsHomePage: true,
      userHasSearched: false,
      userWantsLogin: false,
      userWantsProductList: false,
      userClickedEntry: false,
    })
  }


  // handleUserWantsLogin(event) {
  //   this.setState({
  //     userWantsLogin: true,
  //     invalidPasswordAttempt: false,
  //     userWantsHomePage: false,
  //     userHasSearched: false,
  //     userWantsProductList: false,
  //   })
  // }

  // handleUserWantsLogout(event) {
  //   this.setState({
  //     userLoggedIn: false,
  //     userWantsHomePage: true,
  //     userWantsProductList: false,
  //     userWantsLogin: false,
  //     username: '',
  //     userID: ''
  //   })
  // }

  handleUserWantsProductList(event){
    console.log('inside  product list handler')
    this.setState({
      userWantsProductList: !this.state.userWantsProductList,
    })
  }

  init(){
    var context = this;
    $.ajax({
      url: '/init',
      success: function (data) {
        context.setState({
          topReds: data.top10Reds,
          topWhites: data.top10Whites,
          topRated: data.topRated,
        })
      },
      error: function(error) {
        console.log('error inside init duuudeeee', error)
      }
    })
  }

  getReviews(product_id){
    var context = this;
    console.log('this is the key', product_id)
    $.ajax({
      url: '/reviews',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        product_id: product_id
      }),
      success: function(reviews){
        context.setState({
          reviews: reviews
        })
      },
      error: function(error){
        console.log('error after getting reviews AJAX', error)
      }
    })
  }

  submitReview (review, rating, wine) {
    var context = this;
    console.log('wine', wine);
    var product_id = wine._id;
    var product = wine.name;

    $.ajax({
      url: '/review',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        review: review,
        rating: rating,
        name: name,
        username: this.state.username,
        product_id: product_id,
        time: Date
      }),
      success: function(data) {
        //TODO: provide user feedback upon successful review
        console.log('Received success submitReview AJAX', data)
      },
      error: function(error) {
        console.log('Error submitReview AJAX', error)
      }
    })
  }

  
  search (query, price) {
    var context = this;
    var searchHistory = this.state.searchHistory;
    searchHistory[searchHistory.length] = query;
    console.log('serach histnig' , searchHistory);
    this.setState({
      searchHistory: searchHistory,
      userHasSearched: true,
      userWantsProductList: true,
      userWantsHomePage: false
    })
    console.log('query inside search', query);
    console.log('price inside search', price);
    $.ajax({
      url: '/search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        search: query,
        price: price
      }),
      success: function(data) {
        console.log('success res from searchAJAX', data);
        if (data.length > 0) {
          context.setState({
            products: data,
            userHasSearched: true
          })
        }
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  showHomePageWines () {
    if (!this.state.userClickedEntry) {
      return <HomepageWines 
              topReds={this.state.topReds} 
              topWhites={this.state.topWhites} 
              topRated={this.state.topRated}
              handleClickedProductEntry={this.handleClickedProductEntry}
              />;
    } else {
      return <ProductOverview 
              reviews={this.state.reviews} 
              currentWine={this.state.currentWine} 
              getReviews={this.getReviews} 
              submitReview={this.submitReview}/>;
    }
  }

  handleClickedProductEntry(wine) {
    console.log('inside clicked product entry', wine);
    if (wine) {
      this.setState({
        userClickedEntry: true,
        currentWine: {
          wine: wine
        },
        userWantsHomePage: false
      })
    }
  }


  showProductsList() {
    if (this.state.userHasSearched) {
      const ProductList = <ProductList 
        handleUserWantsProductList={this.handleUserWantsProductList} 
        searchHistory={this.state.searchHistory} 
        reviews={this.state.reviews} 
        getReviews={this.getReviews} 
        products={this.state.products} 
        submitReview={this.submitReview} 
        userHasSearched={this.state.userHasSearched} 
        userWantsProductList={this.state.userWantsProductList}
        />
      return ProductList;
    }

  }

  render (){
    return (
      <div className = 'container'>
        <div className = 'topBackgroundImageWrapper'>
          <TopBar 
            username={this.state.username} 
            userLoggedIn={this.state.userLoggedIn} 
            handleUserWantsLogin={this.handleUserWantsLogin} 
            userHasSearched={this.state.userHasSearched}
          />
          <Search search={this.search} />
        </div>
        {this.showHomePageWines()}
        {this.showProductsList()}
      </div>

    )
  }
}

export default App;

