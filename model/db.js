var mysql = require("mysql");
var pool = mysql.createPool({
host: "tuxa.sme.utc", //ou localhost
user: "sr10p063",
password: "PiT2I9itmaR3",
database: "sr10p063"
});
module.exports = pool;
