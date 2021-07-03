const express = require("express");
const cors = require("cors");

const graphqlHTTP= require("express-graphql");



const app = express();

app.use(cors());

const PORT = 3000 | process.env.port;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})