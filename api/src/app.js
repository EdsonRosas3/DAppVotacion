const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");

const { config } = require("dotenv");
const Routes = require("./routes");


config();


const app = express();

//view aplication;
app.use(express.static(path.join(__dirname, "/public")));

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
/* 
app.use(helmet());

 */
//app.use(express.urlencoded({ extended: false }));

// Route
app.use("/api", Routes);


app.get("/api",(req,res)=>{
  res.send("Api rest")
})

module.exports = app;

