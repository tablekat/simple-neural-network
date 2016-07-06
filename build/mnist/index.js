"use strict";
var path = require('path');
var NeuralNetwork_1 = require('../nn/NeuralNetwork');
var TrainingData_1 = require('../nn/TrainingData');
var data_1 = require('./data');
var dataPath = path.resolve(__dirname, "../../data/mnistout.csv");
console.log("Starting load data...");
data_1.Data.loadFile(dataPath)
    .then(function (data) {
    console.log("Data loaded...");
    var nn = new NeuralNetwork_1.NeuralNetwork({
        numInputs: data.width * data.height,
        numHiddenLayers: 1,
        neuronsPerHiddenLayer: 7,
        numOutputs: 10,
        networkEvaluationSuccessThreshold: 0.05,
        learningRateEta: 2,
    });
    var trainingData = new TrainingData_1.TrainingData();
    for (var i = 0; i < data.imgs.length; ++i) {
        trainingData.train([].slice.call(data.imgs[i].imgData), data.imgs[i].valToArr());
    }
    var testData = trainingData.split(0.2);
    run(nn, trainingData, testData);
});
function run(nn, trainingData, testData) {
    var epochs = 10;
    var miniBatchSize = Math.floor(trainingData.data.length / 10);
    var eta = nn.learningRateEta;
    var printer = function () { };
    nn.stochasticGradientDescent(trainingData, epochs, miniBatchSize, eta, printer, testData);
}
