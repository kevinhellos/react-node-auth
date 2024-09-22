const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

// Allow request from any URL with: origin: *
// For local dev. For production: whitelist allowed domain(s) below
app.use(cors({
  origin: "*"
}));

// ! NOTE: Use this middleware as data is sent via JSON and NOT via Form data !
app.use(express.json());

// Middleware to parse URL-encoded bodies (form data)
// app.use(express.urlencoded({ extended: true }));

const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db",function(err){
    if (err) {
        console.error(err);
        process.exit(1);
    } 
    else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// API Routes
const authApi = require("./api/auth");
app.use("/api/auth", authApi);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});