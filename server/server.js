const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose
  .connect("mongodb+srv://bjjathu04:bjjathu2131@cluster0.h8qkzfe.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((erorr) => console.log(erorr));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log("Server is now Running on port 5000"));
