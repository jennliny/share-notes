"use strict";

var OLDcourses = [
  //here change them into buttons of majors
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

const coursesFile = require("../private/courses.json");
//console.log(`courses.length = ${courses.length}`);
//console.log(JSON.stringify(courses[0],null,2));

exports.showAbout = (req, res) => {
  res.render("about");
};

exports.showForum = (req, res) => {
  res.render("forum");
};

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: OLDcourses
  });
};

exports.showSelectedCourses = (req, res) => {
  res.render("courses");
}

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  let formData = req.body
  res.render("thanks",{formData:formData});
};
