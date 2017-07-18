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
  var token = req.body.token;
  var charge = stripe.charges.create({
    amount: req.body.total,
    currency: "usd",
    description: token.description,
    source: token,
    receipt_email: token.email
  }, function(err, charge) {
    res.send().status(200);
    console.log(charge)
    console.log(err)
  });
})