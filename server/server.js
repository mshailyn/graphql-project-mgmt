const express = require('express');
const colors = require('colors');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require("./config/database");


//Use .env file in config folder
require("dotenv").config({ path: "./server/config/.env" });

//Connect To Database
connectDB();

//Set Up GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))


//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});
