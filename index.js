"use strict"

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended: false});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000, () => {
    console.log("I'm listening port 3000...");
});

app.get("/", (req, res) => {
    res.render("home");
});

var programming = ["Android", "IOS", "Windows Phone", "PHP"];

app.post("/get-note", (req, res) => {
    res.send(programming);
});

app.post("/add", parser, (req, res) => {
    var newNote = req.body.note;
    programming.push(newNote);
    res.send(programming);
});

app.post("/delete", parser, (req, res) => {
    var noteDelete = req.body.idDelete;
    programming.splice(noteDelete, 1);
    res.send(programming);
});

app.post("/update", parser, (req, res) => {
    var noteUpdate = req.body.content;
    var idUpdate = req.body.idUpdate;
    programming[idUpdate] = noteUpdate;
    res.send(programming);
});