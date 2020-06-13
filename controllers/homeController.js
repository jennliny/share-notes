"use strict";


const courses = require("../private/courses.json");
//console.log(`courses.length = ${courses.length}`);
//console.log(JSON.stringify(courses[0],null,2));

exports.showAbout = (req, res) => {
  res.render("about");
};

/*exports.showForum = (req, res) => {
  res.render("forum");
};*/

exports.showCourses = (req, res) => {
  res.render("courses", {
    courses: [],
    term: "Fall19-Fall20",
    department:"any",
  });
};

exports.showSelectedCourses = (req, res) => {

  let subject = req.body.subject

  const selected_courses =
      courses.filter(course =>
        ( (! course['independent_study'])
        &&
        ( (!subject) || course['subject']==subject)
        &&
        (!req.body.term || course['term']==req.body.term)
      ))


  res.render("courses", {
    courses: selected_courses,
    term: req.body.term
  });
};



exports.showSignUp = (req, res) => {
  res.render("addNote");
};

exports.postedSignUpForm = (req, res) => {
  let formData = req.body
  res.render("thanks",{formData:formData});
};
