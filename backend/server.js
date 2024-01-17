const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
server.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "family-tree",
});

db.connect(function (error) {
  if (error) {
    console.log("Hiba a csatlakozáskor.");
  } else {
    console.log("Csatlakozva az adatbázishoz.");
  }
});

server.listen(3000, function check(error) {
  if (error) {
    console.log("Szerverhiba.");
  } else {
    console.log("A szerver elindult.");
  }
});

server.post("/api/familytree/add", (req, res) => {
  let sql =
    "INSERT INTO people (name, birth_date, birth_place, mother_name, father_name, death_date, death_place, gender, parent_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [
    req.body.name,
    req.body.birthDate,
    req.body.birthPlace,
    req.body.motherName,
    req.body.fatherName,
    req.body.deathDate,
    req.body.deathPlace,
    req.body.gender,
    req.body.parentId,
  ];

  db.query(sql, values, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Hiba a küldés közben!" });
    } else {
      res.status(200).json({ status: true, message: "Adatok elküldve!" });
    }
  });
});

server.get("/api/familytree", (req, res) => {
  var sql = "SELECT * FROM people";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Hibás csatlakozás");
    } else {
      res.send({ status: true, data: result });
    }
  });
});
