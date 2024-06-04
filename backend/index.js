const express = require("express");
const {mainRouter} = require("./routes/index");
const app = express();
var cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1",mainRouter);


app.listen('3000',()=>{
    console.log("Server up and running");
})