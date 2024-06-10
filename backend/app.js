const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//!database connection(connect to mongodb)
mongoose
  .connect(
    "mongodb+srv://johnobed3108:OaW4ellXiGKrtbUn@masynctech.in9reoi.mongodb.net/students-dataappNamebase&=masynctech"
  )
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//cors config
// const corsOptions = {
//   origin: ["http://localhost:5173"],
// };
app.use(cors());

//!Middlewares
app.use(express.json()); //?pass incoming json data
//!routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//!error
app.use(errorHandler);

//!start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT}`)
);
