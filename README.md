# nlp-exercises

## Motivation
PyTorch in its official tutorials has a series on NLP from scratch [[1]](https://pytorch.org/tutorials/intermediate/char_rnn_classification_tutorial.html)[[2]](https://pytorch.org/tutorials/intermediate/char_rnn_generation_tutorial.html)[[3]](https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html). While I do consider them a worth-while read for beginners, they lack a lot of important features like GPU support, the use of optimizers, etc, and the style of code is a little too imperative for my liking.  
Here in this little project I tried to address the shortcomings of original tutorial series with more declarative approach and different datasets, all with GPU-enhanced training.

## How to run 
1. lone the repository.
2. Visit scrapers' directories for instructions on how to download the datasets.  
3. Make sure you have all dependencies installed. As for PyTorch, CUDA support is not necessary - if not available, code will be run on CPU.
4. Run notebooks in environment of choice.