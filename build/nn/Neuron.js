"use strict";
var Util_1 = require('./Util');
var Neuron = (function () {
    function Neuron(numInputs) {
        this.numInputs = numInputs;
        if (!numInputs)
            throw new Error("Neuron: numInputs is invalid:" + numInputs);
        this.bias = Util_1.Util.rand();
        this.weights = new Float64Array(numInputs);
        for (var i = 0; i < numInputs; ++i) {
            this.weights[i] = Util_1.Util.rand();
        }
    }
    Neuron.prototype.feedForward = function (input) {
        if (input.length != this.numInputs)
            throw new Error("feedForward: invalid input length " + JSON.stringify(input.length) + " should be " + this.numInputs);
        var activation = this.bias;
        for (var i = 0; i < this.numInputs; ++i) {
            activation += this.weights[i] * input[i];
        }
        if (isNaN(activation)) {
            throw new Error("feedForward: activation NaN for " + JSON.stringify(input) + " and weights " + JSON.stringify(this.weights));
        }
        return Util_1.Util.sigmoid(activation);
    };
    Neuron.prototype.feedForwardRaw = function (input) {
        if (input.length != this.numInputs)
            throw new Error("feedForwardRaw: invalid input length" + JSON.stringify(input));
        var activation = this.bias;
        for (var i = 0; i < this.numInputs; ++i) {
            activation += this.weights[i] * input[i];
        }
        if (isNaN(activation)) {
            throw new Error("feedForwardRaw: activation NaN for " + JSON.stringify(input) + " and weights " + JSON.stringify(this.weights));
        }
        return activation;
    };
    Neuron.prototype.import = function (weights, offset) {
        this.bias = weights[offset];
        for (var i = 0; i < this.numInputs; ++i) {
            this.weights[i] = weights[i + offset + 1];
        }
        return offset + 1 + this.numInputs;
    };
    Neuron.prototype.export = function (weights, offset) {
        weights[offset] = this.bias;
        for (var i = 0; i < this.numInputs; ++i) {
            weights[i + offset + 1] = this.weights[i];
        }
        return offset + 1 + this.numInputs;
    };
    Neuron.prototype.getBias = function () {
        return this.bias;
    };
    Neuron.prototype.putBias = function (x) {
        this.bias = x;
    };
    Neuron.prototype.getWeights = function () {
        return this.weights;
    };
    Neuron.prototype.putWeights = function (ws) {
        for (var i = 0; i < this.numInputs; ++i) {
            this.weights[i] = ws[i];
        }
    };
    return Neuron;
}());
exports.Neuron = Neuron;
