const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");
// const blogRoutes = require("./routes/blogRoutes");

const app = express();

const dbURI =
  "mongodb+srv://netninja:1234@nodetuts.gxyk5lo.mongodb.net/node-tuts?retryWrites=true&w=majority";

// Use to remove warning in terminal
mongoose.set("strictQuery", true);
mongoose.connect(dbURI).then(() => {
  app.listen(3000);
});

// it is a view engine
app.set("view engine", "ejs");
// helps to use css and images
app.use(express.static("public"));

// this is a middleware(used to get data from post req from create blogs), for accepting form data
app.use(express.urlencoded({ extended: true }));
// use of morgan
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.render("index", { title: " Home" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: " Blogs", blogs: result });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blogg: result });
    })
    .catch((err) => console.log(`THis is error ${err}`));
  // console.log(id);
});

app.get("/create", (req, res) => {
  res.render("create", { title: " Create" });
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
