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
  graphiql: process.env.NODE_ENV === 'development'
}))

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', function (req, res) {
  const index = path.join(__dirname, '..', 'client', 'build', 'index.html');
  res.sendFile(index);
});


//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});
