const express = require ('express');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require ('body-parser');
const db = require ('./config/db');

const app = express ();
app.use (bodyParser.urlencoded ({extended: true}));

const PORT = 3000;

MongoClient.connect (db.url, (err, client) => {
  if (err) return console.log (err);
  const database = client.db ('ereviews');
  // Routes
  require ('./routes.js') (app, database);

  // Launch the server
  app.listen (PORT, () => {
    console.log (
      `Server is running. Click on http://localhost:${PORT}/ to open the app`
    );
  });
});
