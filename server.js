const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();


const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("."));

app.use(session({
    secret:"smart-business-secret",
    resave:false,
    saveUninitialized:true
}));



// Database SQLite

const db = new sqlite3.Database(
    "database.db"
);


db.serialize(()=>{


db.run(`
CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT
)
`);



db.run(`
CREATE TABLE IF NOT EXISTS produk(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nama TEXT,
harga INTEGER,
stok INTEGER
)
`);



db.run(`
CREATE TABLE IF NOT EXISTS pelanggan(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nama TEXT,
telepon TEXT,
alamat TEXT
)
`);



db.run(`
CREATE TABLE IF NOT EXISTS penjualan(
id INTEGER PRIMARY KEY AUTOINCREMENT,
produk_id INTEGER,
jumlah INTEGER,
total INTEGER,
tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);


});



// =================
// HALAMAN HTML
// =================


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.get("/dashboard",(req,res)=>{
    res.sendFile(__dirname+"/dashboard.html");
});


app.get("/produk",(req,res)=>{
    res.sendFile(__dirname+"/produk.html");
});


app.get("/penjualan",(req,res)=>{
    res.sendFile(__dirname+"/penjualan.html");
});


app.get("/pelanggan",(req,res)=>{
    res.sendFile(__dirname+"/pelanggan.html");
});


app.get("/laporan",(req,res)=>{
    res.sendFile(__dirname+"/laporan.html");
});


app.get("/ai",(req,res)=>{
    res.sendFile(__dirname+"/ai.html");
});



// =================
// AUTH
// =================


app.post("/api/register",async(req,res)=>{


let username=req.body.username;
let password=req.body.password;


let hash=await bcrypt.hash(
password,
10
);


db.run(
"INSERT INTO users(username,password) VALUES(?,?)",
[
username,
hash
],
(err)=>{

if(err){

return res.json({
status:"error",
message:err.message
});

}


res.json({
status:"success"
});


});


});




app.post("/api/login",(req,res)=>{


let username=req.body.username;
let password=req.body.password;



db.get(
"SELECT * FROM users WHERE username=?",
[username],

async(err,user)=>{


if(!user){

return res.json({
status:"failed"
});

}



let cocok=await bcrypt.compare(
password,
user.password
);



if(cocok){

let token=jwt.sign(
{
id:user.id,
username:user.username
},
"secret-key"
);


return res.json({
status:"success",
token:token
});

}



res.json({
status:"failed"
});


});


});




// =================
// PRODUK
// =================


app.get("/api/produk",(req,res)=>{


db.all(
"SELECT * FROM produk",
[],
(err,rows)=>{

res.json(rows);

});


});



app.post("/api/produk",(req,res)=>{


let data=req.body;


db.run(
`
INSERT INTO produk
(nama,harga,stok)
VALUES(?,?,?)
`,
[
data.nama,
data.harga,
data.stok
],

()=>{


res.json({
status:"success"
});


});


});




// =================
// PELANGGAN
// =================


app.get("/api/pelanggan",(req,res)=>{


db.all(
"SELECT * FROM pelanggan",
[],
(err,rows)=>{

res.json(rows);

});


});



app.post("/api/pelanggan",(req,res)=>{


let d=req.body;


db.run(
`
INSERT INTO pelanggan
(nama,telepon,alamat)
VALUES(?,?,?)
`,
[
d.nama,
d.telepon,
d.alamat
],

()=>{

res.json({
status:"success"
});

});


});




// =================
// PENJUALAN
// =================


app.get("/api/penjualan",(req,res)=>{


db.all(
"SELECT * FROM penjualan",
[],
(err,rows)=>{

res.json(rows);

});


});



app.post("/api/penjualan",(req,res)=>{


let d=req.body;


db.run(
`
INSERT INTO penjualan
(produk_id,jumlah,total)
VALUES(?,?,?)
`,
[
d.produk_id,
d.jumlah,
d.total
],

()=>{

res.json({
status:"success"
});

});


});




// =================
// LAPORAN
// =================


app.get("/api/laporan",(req,res)=>{


db.get(
`
SELECT SUM(total) AS pendapatan
FROM penjualan
`,
[],
(err,row)=>{


res.json({

pendapatan:
row.pendapatan || 0

});


});


});




// =================
// AI ASSISTANT
// =================


app.post("/api/ai",(req,res)=>{


let pesan=req.body.message;


res.json({

answer:
"Smart AI: "+pesan

});


});




// START SERVER


app.listen(
5000,
()=>{
console.log(
"Smart Business Cloud berjalan di http://localhost:5000"
);
});
