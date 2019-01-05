const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(bodyParser.json());

app.listen(port, function listen() {
    console.log(`Started on port ${port}`);
});