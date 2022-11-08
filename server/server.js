const express = require('express');
const colors = require('colors');
const cors = require('cors');
const path = require("path");
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require("./config/database");


//Use .env file in config folder
require("dotenv").config({ path: "./server/config/.env" });

//Connect To Database
connectDB();

//Set up Cors Middleware
app.use(cors());

//Set Up GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, '..', 'client', 'build'));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

else {
  app.use(express.static(path.join(__dirname, '../client/public')));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });
}
//app.use(express.static(path.join(__dirname, '..', 'client', 'build')));



//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});
