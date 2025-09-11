const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/auth-routes/auth-routes')
const adminProductsRoter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddresstRouter = require('./routes/shop/address-routes')

mongoose
  .connect("mongodb+srv://bjjathu04:bjjathu2131@cluster0.h8qkzfe.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((erorr) => console.log(erorr));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRoter)
app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddresstRouter)

app.listen(PORT, () => console.log("Server is now Running on port 5000"));


// 9.47.44