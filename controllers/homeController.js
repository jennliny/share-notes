"use strict";

var courses = [
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

exports.showAbout = (req, res) => {
  res.render("about");
};

exports.showForum = (req, res) => {
  res.render("forum");
};

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  let formData = req.body
  res.render("thanks",{formData:formData});
};
