const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const date = require(__dirname+"/date.js");

mongoose.connect('mongodb://localhost:27017/blogWebsite-V1');

const blogSchema = new mongoose.Schema({
  title: String,
  curdate: String,
  content: String
});

const Blog = mongoose.model('Blog',blogSchema);

const Test = new Blog({
  title:'Test heading',
  content:'Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus.'
});

// Test.save();

// const posts=[];
// posts.push(Test);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = " Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Blog.find(function(err,foundItem){
    if(!err){
      res.render('home',{startingContent: homeStartingContent, foundItem: foundItem});
    }
  })
});

app.get("/about",function(req,res){
  res.render("about",{about: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contact: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
})


app.post("/compose",function(req,res){

  let postTitle= req.body.postTitle;
  let postBody = req.body.postBody;
  let day = date.getDate();
  
  // console.log(day);

  const post=new Blog({
    title : postTitle,
    curdate: day,
    content : postBody 
  });

  post.save();
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  let topicId= req.params.postId;
  Blog.findById(topicId, function(err,foundItem){
    if(!err){
      if(!foundItem)
        res.send("NO data found.");
      else
        res.render('post',{foundItem:foundItem});
    }
  });
      
});


app.post("/edit",function(req,res){
  let id= req.body.postId;
  Blog.findOneAndUpdate(id,)
})


app.post("/delete/:postId", function(req,res){
  let id= req.params.postId;
  // let name= req.body.postName;
  // console.log(id);
  // console.log(name);
  // Blog.findByIdAndDelete(id,function(err){
  //   if(!err){
  //     console.log("successfully deleted the post");
  //     res.redirect("/");
  //   }
  // });
});

app.get("/delete/:postId", function(req,res){
  let id= req.params.postId;
  Blog.findByIdAndRemove(id, function(err){
    if(!err){
      // console.log("Successfully Deleted the item");
      res.redirect("/");
    }
  })
});

app.get("/edit/:postId", function(req,res){
  
  let id= req.params.postId;
  Blog.findById(id,function(err,foundItem){
    if(!err){
      res.render('update', {foundItem:foundItem});
    }
  })
  // let id= req.params.postId;
  // Blog.findByIdAndUpdate(id, {res.render('compose')}, function(err){
  //   if(err)
  //     console.log(err);
  //   else
  //     console.log("Successfully updated");
  // })
})

app.post("/update/:postId", function(req,res){
  let id= req.params.postId;
  let postTitle= req.body.postTitle;
  let postBody= req.body.postBody;
  Blog.findByIdAndUpdate(id,{ title: postTitle, content: postBody },function(err){
    if(err)
      console.log(err);
    else{
      // console.log("yeah updated succefully");
      res.redirect("/");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
