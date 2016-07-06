"use strict";
var fs = require('fs');
var readline = require('readline');
var Promise = require('bluebird');
var NumberImg = (function () {
    function NumberImg(line) {
        if (line[line.length - 1] == ',')
            line = line.substring(0, line.length - 1);
        var vals = line.split(',');
        this.realValue = parseInt(vals[1]);
        this.imgData = new Uint8Array(vals.slice(1));
    }
    NumberImg.prototype.valToArr = function () {
        var _this = this;
        return (new Array(10)).fill(0).map(function (x, i) { return i == _this.realValue ? 1 : 0; });
    };
    return NumberImg;
}());
exports.NumberImg = NumberImg;
var Data = (function () {
    function Data() {
        this.imgs = [];
    }
    Data.loadFile = function (fpath) {
        var instream = fs.createReadStream(fpath);
        return new Promise(function (resolve) {
            var self = new Data();
            var lineReader = readline.createInterface({ input: instream });
            var firstLine = true;
            lineReader.on('line', function (line) {
                if (firstLine) {
                    _a = line.split(','), self.totalCount = _a[0], self.width = _a[1], self.height = _a[2];
                    firstLine = false;
                }
                else {
                    if (!line.trim())
                        return;
                    self.imgs.push(new NumberImg(line));
                }
                var _a;
            });
            lineReader.on('close', function () { return resolve(self); });
        });
    };
    return Data;
}());
exports.Data = Data;
