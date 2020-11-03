const path = require("path");
const express = require("express");
const app = express();
// const index = require("public/index.html");

// app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static( path.join(__dirname, '/public')));
app.listen(3000, () => console.log( "listening" ));