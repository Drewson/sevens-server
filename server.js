const express = require('express')
const app = express()
const json = require('body-parser').json;
const cors = require('cors');
var stripe = require("stripe")(
  "sk_live_YP4647ryPwzlBaNTXfdgwBjw"
);
var port = Number(process.env.PORT || 8080);

app.use(cors())

app.use(json())

app.listen(port, function () {
  console.log('Sevens listening on port 3001!')
})

app.get('/', (req, res) => {
  console.log('hello');
})

app.post('/stripe', (req, res) => {
  console.log(req.body.token)
  var token = req.body.token;
  var charge = stripe.charges.create({
    amount: 1,
    currency: "cad",
    description: "Example charge",
    source: token,
  }, function(err, charge) {
    console.log(charge)
    console.log(err)
  });
})