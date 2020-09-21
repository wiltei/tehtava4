/***********************************************************************************************
*******************
* Vilho Teivainen *
* 1904654         *
* 21.9.2020       *
*******************
Tehtävä
Täydennä serveriä lisäämällä get, post, put, delete metodien käsittely
***********************************************************************************************/

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: "localhost",
  user: "teivavi",
  password: "incorrect!",
  database: "puhelinluettelo",
  multipleStatements: true, //out parametria varten aliohjelmassa
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});

/********************************************/
// GET Kaikkien käyttäjien haku tietokannasta
/********************************************/
app.get("/users", function (req, res) {
  con.query("SELECT * FROM henkilot", (err, rows) => {
    if (err) throw err;
    // tämä palauttaa selaimelle/clientille haun tulokset jotka menevät 'rows' kyydissä
    // message tulostaa loppuun vielä annetun mietelauseen
    return res.send({ error: false, data: rows, message: "users list." });
    // pukeltaa datan tietokannasta konsoliin, tässä varmistuksena
    // console.log("Data received from Db:");
    // rows.forEach((row) => {
    //   console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
    // });
  });
});

/****************************/
// GET käyttäjä id-numerolla
/****************************/
app.get("/users/:id", function (req, res) {
  let haettuId = req.params.id;
  con.query(
    "SELECT * FROM henkilot WHERE id=" + haettuId + ";",
    (err, rows) => {
      if (err) throw err;
      return res.send({
        data: rows,
      });
      // tää on vissiin joku mystinen joukko jossa asuu kaikki
      // tarvittavat muuttujat elikkä ainakin clientin pyynnön data
      // requestin parametrit kyseessä veikkaisin
      // tässä napataan haettu id -numero.
    }
  );
});

/********************************************/
// POST Lisää käyttäjä tietokantaan
/********************************************/

app.post("/adduser", function (req, res) {
  // lisättävä käyttäjä sijaitsee rungossa, toivottavasti.
  // Äkkäsin että tämähän ei toimi pelkällä selaimella laittamalla osoiteriville jotain vaan
  // tarvitaan vaik se Postman. Nih. Sit selkis. Ja sql-lausekkeen luominen oli aika näperrystä.
  // On varmaan helpompikin keino siihen.
  let lisId = req.body.id;
  let lisNimi = req.body.nimi;
  let lisNro = req.body.puhelin;
  con.query(
    "INSERT INTO henkilot (id, nimi, puhelin) VALUES (" +
      lisId +
      ",'" +
      lisNimi +
      "','" +
      lisNro +
      "');",
    (err, rows) => {
      if (err) throw err;
      return res.send({
        message: "Lisäsit seuraavat tiedot:",
        data: rows,
      });
    }
  );
});

// con.query("SELECT * FROM henkilot", (err, rows) => {
//   if (err) throw err;

//   console.log("Data received from Db:");
//   rows.forEach((row) => {
//     console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
//   });
// });

// const henkilo = { nimi: "Ankka Roope", puhelin: "050-1231232" };
// con.query("INSERT INTO henkilot SET ?", henkilo, (err, res) => {
//   if (err) throw err;

//   console.log("Last insert ID:", res.insertId);
// });

// con.query(
//   "UPDATE henkilot SET puhelin = ? Where ID = ?",
//   ["044-6544655", 3],
//   (err, result) => {
//     if (err) throw err;

//     console.log(`Changed ${result.changedRows} row(s)`);
//   }
// );

// con.query("DELETE FROM henkilot WHERE id = ?", [5], (err, result) => {
//   if (err) throw err;

//   console.log(`Deleted ${result.affectedRows} row(s)`);
// });

// con.query("CALL sp_get_henkilot()", function (err, rows) {
//   if (err) throw err;

//   rows[0].forEach((row) => {
//     console.log(`${row.nimi},  puhelin: ${row.puhelin}`);
//   });
//   console.log(rows);
// });

// con.query("CALL sp_get_henkilon_tiedot(1)", (err, rows) => {
//   if (err) throw err;

//   console.log("Data received from Db:\n");
//   console.log(rows[0]);
// });

// con.query(
//   "SET @henkilo_id = 0; CALL sp_insert_henkilo(@henkilo_id, 'Matti Miettinen', '044-5431232'); SELECT @henkilo_id",
//   (err, rows) => {
//     if (err) throw err;

//     console.log("Data received from Db:\n");
//     console.log(rows);
//   }
// );

// const userSubmittedVariable =
//   "1"; /*että kukaan ei voi syöttää tätä:
// const userSubmittedVariable = '1; DROP TABLE henkilot';*/

// con.query(
//   `SELECT * FROM henkilot WHERE id = ${mysql.escape(userSubmittedVariable)}`,
//   (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
//   }
// );

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });
