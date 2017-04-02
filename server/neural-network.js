const synaptic = require("synaptic");

module.exports.createTrainedNN = (trainingSet) => {
  const NN = new synaptic.Architect.Perceptron(6, 3, 1);
  const newTrainer = new synaptic.Trainer(NN);
  newTrainer.train(trainingSet);
  return NN;
}

// module.exports.newUserNN = () => {
//   return new synaptic.Architect.Perceptron(6, 3, 1);
// }

// module.exports.train = (NN, trainingSet) => {
//   const parsedNN = synaptic.Network.fromJSON(NN);
//   const newUserTrainer = new synaptic.Trainer(parsedNN);
//   newUserTrainer.train(trainingSet);
//   return parsedNN;
// }