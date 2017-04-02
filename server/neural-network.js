const synaptic = require("synaptic");

module.exports.createTrainedNN = (trainingSet) => {
  const NN = new synaptic.Architect.Perceptron(6, 3, 1);
  const newTrainer = new synaptic.Trainer(NN);
  newTrainer.train(trainingSet);
  return NN;
}