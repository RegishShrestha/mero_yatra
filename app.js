const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.render("index", { title: " Home" });
});

app.get("/blogs", (req, res) => {
  res.render("blogs", { title: " Blog" });
});

app.get("/destination", (req, res) => {
  res.render("destination", { title: " Destination" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: " Contact" });
});
