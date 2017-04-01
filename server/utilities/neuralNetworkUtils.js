const NN = require('../neural-network.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const synaptic = require("synaptic");

const convertWinetoNeuron = (wine) => {
  let type = wine.redORwhite === 'Red Wines' ? 1 : 0;
  let cab = wine.type === 'Cabernet Sauvignon' ? 1 : 0;
  let merlot = wine.type === 'Merlot' ? 1 : 0;
  let chard = wine.type === 'Chardonnay' ? 1 : 0;
  let sauv = wine.type === 'Sauvignon Blanc' ? 1 : 0;
  let price = wine.priceMin / 100;
  wine.neurons = [type, cab, merlot, chard, sauv, price];
  return wine;
}

module.exports.recommendations = (username) => {
  let profile = null;
  let wines = null;
  return Product.allWines()
    .then((allWines) => {
      wines = allWines.map((wine) => {
        return convertWinetoNeuron(wine);
      })
      return User.findUser(username)
    })
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
}

module.exports.retrain = (username, wine, like) => {
  const neurons = convertWinetoNeuron(wine);
  return User.findUser(username)
    .then((user) => {
      if (user[0]) {
        let profile = user[0].recommendation_profile;
        const trainingSet = [{
          input: neurons,
          output: like
        }];
        profile = NN.train(profile, trainingSet);
        return User.updateUserNN(username, profile)
      } else {
        return Promise.reject('user not found');
      }
    })
    .then((response) => {
      return 'success training NN';
    })
}

module.exports.transformQuestResultsToTrainingData = (questResults) => {
  const trainingSet = [];
  if (questResults.varietal === 'unsure') {
    if (typeof questResults.wineType === 'object') {
      for (var i = 0; i < questResults.wineType.length; i++) {
        generatePreferenceForEachPrice(trainingSet, questResults, questResults.wineType[i]);
      }   
    } else {
      if (questResults.wineType === 'white') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'white');
      } else if (questResults.wineType === 'red') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'red');
      }
    }
  } else {
    if (typeof questResults.varietal === 'object') {
      for (var i = 0; i < questResults.varietal.length; i++) {
        if (questResults.varietal[i] === 'cabernet' || questResults.varietal[i] === 'merlot') {
          generatePreferenceForEachPrice(trainingSet, questResults, 'red', questResults.varietal[i]);
        } else if (questResults.varietal[i] === 'chardonnay' || questResults.varietal[i] === 'sauvignonBlanc') {
          generatePreferenceForEachPrice(trainingSet, questResults, 'white', questResults.varietal[i]);
        }
      }
    } else {
      if (questResults.varietal === 'cabernet') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'red', 'cabernet');
      } else if (questResults.varietal === 'merlot') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'red', 'merlot');        
      } else if (questResults.varietal === 'chardonnay') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'white', 'chardonnay');        
      } else if (questResults.varietal === 'sauvignonBlanc') {
        generatePreferenceForEachPrice(trainingSet, questResults, 'white', 'sauvignonBlanc');        
      }
    }
  }
  return trainingSet;
}

const assignVarietal = (preference, varietal) => {
  if (varietal === 'cabernet') {
    preference.input[1] = 1;
  } else if (varietal === 'merlot') {
    preference.input[2] = 1;      
  } else if (varietal === 'chardonnay') {
    preference.input[3] = 1;      
  } else if (varietal === 'sauvignonBlanc') {
    preference.input[4] = 1;      
  }
}

const generateOnePreference = (trainingSet, wineType, price, varietal) => {
  if (wineType === 'red') {
   let preference = {
      input: [0, 0, 0, 0, 0, 0],
      output: [1]
    }
    preference.input[0] = 1;
    assignVarietal(preference, varietal);
    preference.input[5] = (price / 100); 
    trainingSet.push(preference);    
  } else {
    let preference = {
      input: [0, 0, 0, 0, 0, 0],
      output: [1]
    }
    assignVarietal(preference, varietal);
    preference.input[5] = (price / 100); 
    trainingSet.push(preference);
  }  
}

const generatePreferenceForEachPrice = (trainingSet, questResults, wineType, varietal) => {
  if (typeof questResults.price === 'object') {
    for (var i = 0; i < questResults.price.length; i++) {
      generateOnePreference(trainingSet, wineType, questResults.price[i], varietal);
    }
  } else {
    generateOnePreference(trainingSet, wineType, questResults.price, varietal);
  }  
}
