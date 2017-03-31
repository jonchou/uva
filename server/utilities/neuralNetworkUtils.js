const NN = require('../neural-network.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const synaptic = require("synaptic");

const convertWinetoNeuron = (wine) => {
  let type = wine.redORwhite === 'Red Wines' ? 1 : 0;
  let price = wine.priceMin / 100;
  let cab = wine.type === 'Cabernet Sauvignon' ? 1 : 0;
  let merlot = wine.type === 'Merlot' ? 1 : 0;
  let chard = wine.type === 'Chardonnay' ? 1 : 0;
  let sauv = wine.type === 'Sauvignon Blanc' ? 1 : 0;
  wine.neurons = [type, cab, merlot, chard, sauv, price];
  return wine;
}

module.exports.recommendations = (username) => {
  let profile = null;
  return Product.allWines()
    .then((wines) => {
      wines = wines.map((wine) => {
        return convertWinetoNeuron(wine);
      })
      return User.findUser(username)
        .then((user) => {
          if (user[0]) {
            profile = synaptic.Network.fromJSON(user[0].recommendation_profile);
            return wines.map((wine) => {
              wine.rating = profile.activate(wine.neurons)[0];
              return wine;
            }).sort((a, b) => {
              return b.rating - a.rating;
            });
          }
        })
    })
}

const transformQuestToTrainingData = (questResults) => {
  const trainingSet = [];

  if (questResults.varietal === 'unsure') {
    if (typeof questResults.wineType === 'object') {
      for (var i = 0; i < questResults.wineType.length; i++) {
        generatePreferenceForEachPrice(trainingSet, questResults, questResults.wineType[i], questResults.price);
      }   
    } else {
      if (questResults.wineType === 'white') {
        generatePreferenceForEachPrice(trainingSet, questResults, questResults.wineType, questResults.price);
      } else if (questResults.wineType === 'red') {
        generatePreferenceForEachPrice(trainingSet, questResults, questResults.wineType, questResults.price);
      }
    }
  } else {

  }

  return trainingSet;
}

const generateOnePreference = (trainingSet, questResults, wineType, price) => {
  if (wineType === 'red') {
   let preference = {
      input: [0, 0, 0, 0, 0, 0],
      output: [1]
    }
    preference.input[0] = 1;
    preference.input[5] = (price / 100); 
    trainingSet.push(preference);    
  } else {
    let preference = {
      input: [0, 0, 0, 0, 0, 0],
      output: [1]
    }
    preference.input[5] = (price / 100); 
    trainingSet.push(preference);
  }  
}

const generatePreferenceForEachPrice = (trainingSet, questResults, wineType, price) => {
  if (typeof questResults.price === 'object') {
    for (var j = 0; j < questResults.price.length; j++) {
      generateOnePreference(trainingSet, questResults, wineType, questResults.price[j]);
    }
  } else {
    generateOnePreference(trainingSet, questResults, wineType, questResults.price);
  }  
}

const quest4 = { 
  wineType: 'red', 
  varietal: 'unsure', 
  price: '10' 
}

const quest1 = { 
  wineType: 'white',
  varietal: [ 'merlot', 'chardonnay' ],
  price: [ '10', '20', '30', '40' ] 
}

const quest2 = { 
  wineType: [ 'red', 'white' ],
  varietal: [ 'cabernet', 'sauvignonBlanc' ],
  price: [ '10', '20', '70' ] 
}

const quest3 = { 
  wineType: 'white', 
  varietal: 'merlot', 
  price: '10' 
}

// what to do if leave varietal blank
// if the person says they like red but dont indicate a varietal what do i do

const trainingSet = [
  {
    input: [0, 0, 0, 0, 0, .2],
    output: [1]
  },
  {
    input: [0, 0, 0, 0, 0, .9],
    output: [0]
  },
  {
    input: [0, 0, 0, 0, 0, .4],
    output: [1]
  },
  {
    input: [0, 0, 0, 0, 0, .1],
    output: [1]
  },
  {
    input: [0, 0, 0, 0, 0, .8],
    output: [0]
  },
  {
    input: [0, 0, 0, 0, 0, .6],
    output: [0]
  },
]

module.exports.transformQuestToTrainingData = transformQuestToTrainingData;
