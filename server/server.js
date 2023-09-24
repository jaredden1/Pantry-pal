require("dotenv").config();
require("./config/database");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const recipesRouter = require("./routes/recipes");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/recipes", recipesRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on ${process.env.PORT || 4000}`);
});
