require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// Sanity Test Route
app.get("/", (req, res) => {
  res.send("Shop Filter API Works");
});

// API Routes
app.use("/api/v1/products", productsRouter);

// Not Found & Error Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // db connection
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected.");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
