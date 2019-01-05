# Node.js playground

By Luis Velásquez

This repository is a playground used to as a reference for useful examples, structuring, functions, packages and more that I've found to forget sometimes or needed to refresh my knowledge.

It is recommended to open this repo using vscode as it eases the debugging + editing process

As the usual repo, just npm install and feel free to roam around and play with the code inside here.

## Editor setup

The application has a `launch.json` file in `.vscode` where you can find some useful launch configurations

The .eslintrc.json file is a combination and reference of useful linter settings I've liked along the way.

## Getting started

1. Make sure you have node >8.11.3 installed on your environment to avoid any issues that may arise from incompatible versions

```
git clone git@github.com:luisgvv/node-playground-app.git
cd node-playground-app
npm install
code .
```

2. Make sure you have mongoDB up and running

3. Run the corresponding npm script or launch the app with vscode

## Contents

Currently this repo contains:

### Express App:

A simple express app

### Tests:

I've found the mocha + chai libraries to be useful, easy to understand and configure. Writing your own tests will save you lots of time by avoiding the setup of scenario setups, loading browser, ensuring the data describes the use case. All of the previous over and over again which can become painful.

Get to know your testing suite and learn the test facilities provided by the framework you're using and your development speed will increase for sure.



