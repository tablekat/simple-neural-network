"use strict";
var Util = (function () {
    function Util() {
    }
    Util.clamp = function (arg, min, max) {
        if (arg < min)
            return min;
        if (arg > max)
            return max;
        return arg;
    };
    Util.sigmoid = function (z) {
        return 1 / (1 + Math.exp(-z));
    };
    Util.sigmoidPrime = function (z) {
        return Util.sigmoid(z) * (1 - Util.sigmoid(z));
    };
    Util.dot = function (xs, ys) {
        if (xs.length != ys.length) {
            throw new Error("Util.dot: xs and ys not same length.");
        }
        var z = 0;
        for (var i = 0; i < xs.length; ++i) {
            z += xs[i] * ys[i];
        }
        return z;
    };
    Util.hadamard = function (xs, ys) {
        if (xs.length != ys.length)
            throw new Error("Util.hadamard: xs and ys not same length");
        var res = new Float64Array(xs.length);
        for (var i = 0; i < xs.length; ++i) {
            res[i] = xs[i] * ys[i];
        }
        return res;
    };
    Util.rand = function () {
        return Math.random() - Math.random();
    };
    Util.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    };
    return Util;
}());
exports.Util = Util;
