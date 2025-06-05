const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
// const router = express.Router();
const routes = require('./routes/Route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
});

