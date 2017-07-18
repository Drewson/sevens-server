const express = require('express')
const app = express();
const cors = require('cors')
const json = require('body-parser').json;
var stripe = require("stripe")(
  "sk_live_YP4647ryPwzlBaNTXfdgwBjw"
);
var port = Number(process.env.PORT || 8080);

app.use(json())

app.use(cors());

app.listen(port, function () {
  console.log('Sevens listening on port: ' + port)
})

app.get('/', (req, res) => {
  console.log('hello');
})

app.get('/stripe', (req, res) => {
  console.log('hello from stripe');
})

app.post('/stripe', (req, res) => {
  console.log(req.body)
  var token = req.body;

  stripe.customers.create({
    email: token.email
  }).then(function(customer){
    return stripe.customers.createSource(customer.id, {source: token.id});
  }).then(function(source) {
    return stripe.charges.create({
      amount: 1,
      currency: 'usd',
      customer: source.customer
    });
  }).then(function(charge) {
    // New charge created on a new customer
    console.log(charge)
  }).catch(function(err) {
    // Deal with an error
    console.log(err)
  });
})