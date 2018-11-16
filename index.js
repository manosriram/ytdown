const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

const home = require("./routes/main");

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

app.use("/home", home);

module.exports = app;
