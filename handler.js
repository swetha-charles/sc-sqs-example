'use strict';
const AWS = require('aws-sdk')
const SQS = new AWS.SQS()

module.exports.receiveMessage = async (event) => {
  console.log('Message received! event:', event);
  return 'done';
};

module.exports.sendMessage = async (event) => {
  const queueURL = process.env.QUEUE_URL;
  console.log(event);
    // Flood SQS Queue
    for (let i=0; i<50; i++) {
      await SQS.sendMessageBatch({ Entries: flooder(), QueueUrl: queueURL }).promise()
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ "message": "done!" })
  };

  return response;
};

const messages = [
  "Marzipan cake oat cake croissant macaroon pie dragée cheesecake toffee. Marshmallow sweet sweet roll danish marshmallow croissant. Oat cake cake candy. Toffee liquorice jelly beans",
  "Tiramisu sweet roll carrot cake. Chocolate cotton candy jelly tootsie roll donut jelly beans muffin jelly marzipan. Pudding chupa chups tootsie roll chupa chups",
  "Halvah liquorice pastry sugar plum toffee cake biscuit icing. Bonbon sugar plum gummies chocolate oat cake. Sugar plum chocolate bar biscuit fruitcake cake sweet.",
  "Icing danish carrot cake. Marzipan tart wafer toffee sesame snaps. Cake cake tootsie roll croissant gummi bears jujubes toffee bonbon pie. Gingerbread pastry macaroon",
  "Pastry liquorice macaroon gummies. Sweet toffee cheesecake biscuit chocolate cake sugar plum fruitcake pastry. Chocolate bar liquorice fruitcake gummies."
]

const flooder = () => {
  let entries = []

  for (let i=0; i<10; i++) {
      entries.push({
        Id: 'id'+parseInt(Math.random()*1000000),
        MessageBody: messages[Math.floor(Math.random() % 4)]
    })
  }
  return entries
};