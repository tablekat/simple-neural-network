# simple nodejs neural network

... with Stochastic Gradient Descent.

Neural network stuff: `src/nn`  
Using it on MNIST handwriting number recognition: `src/mnist`

Success threshold and the learning rate (eta) are defined in `src/mnist/index.ts`, play with those if you want.
The most interesting I've found is threshold: 0.05, eta: 2.

### Referred to
[This book thing](http://neuralnetworksanddeeplearning.com/chap1.html) to figure out the SGD related stuff. Converting from gross untyped python code to a language with typing is really annoying.
