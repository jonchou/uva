const synaptic = require("synaptic");

module.exports.newUserNN = () => {
  return new synaptic.Architect.Perceptron(6, 3, 1);
}

module.exports.train = (NN, trainingSet) => {
  const parsedNN = synaptic.Network.fromJSON(NN);
  const newUserTrainer = new synaptic.Trainer(parsedNN);
  newUserTrainer.train(trainingSet);
  return parsedNN;
}