const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// log request
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running on port 5000"));
