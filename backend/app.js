const express = require("express");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const cors = require("cors");
const transactionRouter = require("./routes/transactionRoutes");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMW");
require("dotenv").config();
const app = express();
const PORT = 8000;

//mongo
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log(e));

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//middleware
app.use(express.json());

//routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//errorhandler
app.use(errorHandler);

app.listen(PORT, console.log("The app is running successfully"));
