require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./configuration/db");
const authRoute = require("./routing/authRoute");

const app = express();

app.use(express.json());

//Middlewaer to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
