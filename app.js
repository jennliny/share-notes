"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
  mongoose.connect(
     'mongodb://localhost/share-notes',
     {useNewUrlParser:true})
const db = mongoose.connection;
  db.on('error',(x)=>console.log("connection error"+x))
  db.once('open',(x)=>console.log("We connected at "+new Date()+x))

const authRouter = require('./routes/authentication');
app.use(authRouter)

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/courses", homeController.showCourses);
app.post("/courses", homeController.showSelectedCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/about", homeController.showAbout);


app.get("/jennifer", (req, res) => {
  res.render("jennifer");
});

app.get("/yi-wen", (req, res) => {
  res.render("yi-wen");
});

app.get("/Keyi", (req, res) => {
  res.render("Keyi");
});

const Review=require("./models/Review")
app.get("/showContacts",
   async (req,res) => {
     try {
       res.locals.reviews = await Review.find({})
       //res.json(res.locals.contacts)
       res.render('showContacts')
     }
     catch(theError){
       console.log("Error:")
       res.send("There was an error in /showContacts!")

     }
   });

app.post('/review',
  async (req,res) => {
    try {
      let author = req.body.author
      let subject = req.body.subject
      let title = req.body.title
      let courseID = req.body.courseID
      let  term= req.body.term
      let section = req.body.section
      let newReview = new Review({author:author, subject:subject, title: title,
       courseID:courseID, term: term, section: section})
      await newReview.save()
      res.redirect('/showContacts')
    }
    catch(e) {
      console.dir(e)
      res.send("error in addContact")
    }
})


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
