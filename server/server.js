import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user-routes.js';
import dotenv from "dotenv";
import * as config from "./db/config.js";
import cors from "cors";

const port = process.env.PORT || 9000;

// Connect to database
mongoose.connect(config.database.database);

// On connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database.database);
});

// On error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});


const app = express();

// Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
  


// CORS Middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});


app.use("/user", userRoutes);

