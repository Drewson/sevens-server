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

app.post('/stripe/:total', (req, res) => {
  var total = parseInt(req.params.total)
  console.log(total)
  var token = req.body;
  var charge = stripe.charges.create({
    amount: 1,
    currency: "usd",
    description: 'payment success',
    source: token,
    receipt_email: token.email
  }, function(err, charge) {
    err === undefined &&
      res.send(JSON.parse('Success!'));
    console.log(charge)
    console.log(err)
  });
})