const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const dbURI =
  "mongodb+srv://netninja:1234@nodetuts.gxyk5lo.mongodb.net/node-tuts?retryWrites=true&w=majority";

// Use to remove warning in terminal
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

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

app.get("/create", (req, res) => {
  res.render("create", { title: " Create" });
});

app.get("/blogs", (req, res) => {
  const blogs = [
    { title: "Regish Birthday", snippet: "today is regish birthday" },
    { title: "Regish Birthday", snippet: "today is regish birthday" },
    { title: "Regish Birthday", snippet: "today is regish birthday" },
  ];
  res.render("blogs", { title: " Blogs", blogs });
});

app.get("/destination", (req, res) => {
  res.render("destination", { title: " Destination" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: " Contact" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
