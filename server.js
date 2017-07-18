const express = require('express')
const app = express()
const json = require('body-parser').json;
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
  console.log(req.body)
  var token = req.body.token;
  var charge = stripe.charges.create({
    amount: req.body.total,
    currency: "cad",
    description: "Example charge",
    source: token,
    receipt_email: token.email
  }, function(err, charge) {
    console.log(charge)
    console.log(err)
  });
})