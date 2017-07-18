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


var whitelist = ['https://sevens-client.herokuapp.com', 'https://sevens-client.herokuapp.com/cart']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  }else{
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

app.post('/stripe/:total', cors(corsOptionsDelegate), (req, res) => {
  console.log(req.body)
  var total = 100;
  total = req.params.total * 100;
  console.log(total)
  var token = req.body;

  stripe.customers.create({
    email: token.email
  }).then(function(customer){
    return stripe.customers.createSource(customer.id, {source: token.id});
  }).then(function(source) {
    return stripe.charges.create({
      amount: total,
      currency: 'usd',
      customer: source.customer
    });
  }).then(function(charge) {
    res.send().status(200)
    res.send(JSON.parse('Success'))
    console.log(charge)
  }).catch(function(err) {
    res.send(JSON.parse('broke'))
    console.log(err)
  });
})