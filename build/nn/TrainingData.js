"use strict";
var Util_1 = require('./Util');
var TrainingPair = (function () {
    function TrainingPair(input, output) {
        this.input = new Float64Array(input);
        this.output = new Float64Array(output);
    }
    return TrainingPair;
}());
exports.TrainingPair = TrainingPair;
var TrainingData = (function () {
    function TrainingData() {
        this.data = [];
        this.batchIterator = 0;
    }
    TrainingData.prototype.export = function () {
        return JSON.stringify(this.data.map(function (x) {
            return { input: x.input, output: x.output };
        }));
    };
    TrainingData.prototype.import = function (data) {
        var _this = this;
        var d = JSON.parse(data);
        d.map(function (x) { return _this.train(x.input, x.output); });
    };
    TrainingData.prototype.train = function (input, output) {
        this.data.push(new TrainingPair(input, output));
    };
    TrainingData.prototype.shuffle = function () {
        this.data = Util_1.Util.shuffle(this.data);
    };
    TrainingData.prototype.reset = function () {
        this.batchIterator = 0;
        this.shuffle();
    };
    TrainingData.prototype.getBatch = function (batchSize) {
        var result = [];
        for (var i = 0; i < batchSize; ++i) {
            if (i + this.batchIterator > this.data.length - 1)
                break;
            result.push(this.data[i + this.batchIterator]);
        }
        this.batchIterator += batchSize;
        return result;
    };
    TrainingData.prototype.split = function (ratio) {
        if (ratio < 0 || ratio > 1)
            return new TrainingData();
        var removeCount = Math.floor(this.data.length * ratio);
        var keepCount = this.data.length - removeCount;
        var newData = new TrainingData();
        for (var i = 0; i < removeCount; ++i) {
            newData.data.push(this.data[keepCount + i]);
        }
        this.data.length = keepCount;
        return newData;
    };
    return TrainingData;
}());
exports.TrainingData = TrainingData;
