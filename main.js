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

app.post("/note", homeController.postedSignUpForm);
app.get("/about", homeController.showAbout);
//app.get("/addNote", homeController.showSignUp);
//app.post("/addNote", homeController.postedSignUpForm);

app.get("/jennifer", (req, res) => {
  res.render("jennifer");
});

app.get("/yi-wen", (req, res) => {
  res.render("yi-wen");
});

app.get("/Keyi", (req, res) => {
  res.render("Keyi");
});


const Note=require("./models/Note")

app.get("/addNote",
  (req,res) =>{
    res.render("addNote", req.params)
  }
)
//route to adding a note page
app.get("/note/:subject/:courseID/:section/:term",
  (req, res) => {
    res.render("note", req.params)
  }
)
//route for submitting the add-note form
app.post('/addNote',
  async (req,res) => {
    try {
      let author = req.body.author
      let note = req.body.note
      let subject = req.body.subject
      //let title = req.body.title
      let courseID = req.body.courseID
      let term= req.body.term
      let section = req.body.section
      let newNote = new Note({author:author, note:note,
        subject:subject,  courseID:courseID,
        term: term, section: section})
      await newNote.save()
      res.redirect(`/showNotes/${
          req.body.subject}/${
          req.body.courseID}/${
          req.body.section}/${
          req.body.term}` )
    }
    catch(e) {
      console.dir(e)
      res.send("error in /addNote")
    }
})

app.get("/showNotes/:subject/:courseID/:section/:term",
   async (req,res, next) => {
     try {
       const query={
        subject:req.params.subject,
        courseID:req.params.courseID,
        section:req.params.section,
        term:req.params.term,
      }

      res.locals.notes =
          await Note.find(query)
      res.locals.subject = req.params.subject
      res.locals.courseID = req.params.courseID
      res.locals.section = req.params.section
      res.locals.term = req.params.term
       res.render('showNotes')
     }
     catch(e){
       console.dir(e)
       console.log("Error:")
       res.send("There was an error in /showNotes!")
       next(e)
     }
   });



app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
