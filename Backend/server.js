require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./configuration/db");
const authRoute = require("./routing/authRoute");
const incomeRoute = require("./routing/incomeRoute");
const expenseRoute = require("./routing/expenseRoute");
const dashboardRoute = require("./routing/dashboardRoute");

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

app.use("/api/v1/income", incomeRoute);

app.use("/api/v1/expense", expenseRoute);

app.use("/api/v1/dashboard", dashboardRoute);

//Server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
