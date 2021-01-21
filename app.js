const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let postsArr = [
  {
    title: "Day 1",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris in aliquam sem fringilla ut morbi. Et odio pellentesque diam volutpat. At volutpat diam ut venenatis tellus in. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Eget dolor morbi non arcu risus quis varius quam quisque. At volutpat diam ut venenatis. Duis ut diam quam nulla porttitor massa id neque. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Aliquam vestibulum morbi blandit cursus. In massa tempor nec feugiat nisl pretium fusce id.",
  },
  {
    title: "Day 2",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris in aliquam sem fringilla ut morbi. Et odio pellentesque diam volutpat. At volutpat diam ut venenatis tellus in. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Eget dolor morbi non arcu risus quis varius quam quisque. At volutpat diam ut venenatis. Duis ut diam quam nulla porttitor massa id neque. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Aliquam vestibulum morbi blandit cursus. In massa tempor nec feugiat nisl pretium fusce id.",
  },
];

const contactContent =
  "Welcome! This is my personal blog where I share stuff that has no meaning ! :) ";

app.get("/", function (req, res) {
  res.render("home", { posts: postsArr });
});
app.get("/about", function (req, res) {
  res.render("about", { title: "About" });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactCon: contactContent, title: "Contact" });
});
app.get("/compose", function (req, res) {
  res.render("compose", { title: "Compose" });
});
app.get("/posts/:postName", function (req, res) {
  postsArr.forEach(function (post) {
    if (post.title.toLowerCase === req.params.postName.toLowerCase) {
      console.log("MatchFound!");
      res.render("post", { postBody: post.body, postTitle: post.title });
    } else {
      console.log("No Mantch Found!");
    }
  });
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  postsArr.push(post);
  res.redirect("/compose");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
