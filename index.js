const mysql = require("mysql");

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: "localhost",
  user: "mikko",
  password: "kt123456",
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

// con.query("SELECT * FROM henkilot", (err, rows) => {
//   if (err) throw err;

//   console.log("Data received from Db:");
//   rows.forEach((row) => {
//     console.log(`${row.nimi}, puhelin on ${row.puhelin}`);
//   });
// });

// const henkilo = { nimi: 'Ankka Roope', puhelin: '050-1231232' };
// con.query('INSERT INTO henkilot SET ?', henkilo, (err, res) => {
//   if(err) throw err;

//   console.log('Last insert ID:', res.insertId);
// });

// con.query(
//     'UPDATE henkilot SET puhelin = ? Where ID = ?',
//     ['044-6544655', 3],
//     (err, result) => {
//       if (err) throw err;

//       console.log(`Changed ${result.changedRows} row(s)`);
//     }
//   );

// con.query("DELETE FROM henkilot WHERE id = ?", [5], (err, result) => {
//   if (err) throw err;

//   console.log(`Deleted ${result.affectedRows} row(s)`);
// });

// con.query("CALL sp_get_henkilot()", function (err, rows) {
//   if (err) throw err;

//   rows[0].forEach( (row) => {
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
//     "SET @henkilo_id = 0; CALL sp_insert_henkilo(@henkilo_id, 'Matti Miettinen', '044-5431232'); SELECT @henkilo_id",
//     (err, rows) => {
//       if (err) throw err;

//       console.log('Data received from Db:\n');
//       console.log(rows);
//     }
//   );
// const userSubmittedVariable =
//   "1"; /*ettÃ¤ kukaan ei voi syÃ¶ttÃ¤Ã¤ tÃ¤tÃ¤:
// const userSubmittedVariable = '1; DROP TABLE henkilot';*/

// con.query(
//   `SELECT * FROM henkilot WHERE id = ${mysql.escape(userSubmittedVariable)}`,
//   (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
//   }
// );

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});
