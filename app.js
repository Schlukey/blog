const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
const _ = require("lodash");

const posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// for the home page
app.get("/", (req, res) => {
  res.render("home", { startText: homeStartingContent, postHistory: posts });
});
// individual post pages
app.get("/post/:postID", (req, res) => {
  const postName = _.lowerCase(req.params.postID);
  console.log(postName);

  posts.forEach(function (newPost) {
    const postTitle = _.lowerCase(newPost.title);
    const postBody = newPost.body;
    if (postName == postTitle) {
      console.log("Match found");
      res.render("post", {
        title: postTitle,
        content: postBody,
      });
    }
  });
});
// the about page
app.get("/about", (req, res) => {
  res.render("about", { aboutText: aboutContent });
});
// the contact page
app.get("/contact", (req, res) => {
  res.render("contact", { contactText: contactContent });
});
// the private compose page
app.get("/compose", (req, res) => {
  res.render("compose");
});

// for posting blogs to the page
app.post("/compose", (req, res) => {
  let newPost = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  posts.push(newPost);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started");
});
