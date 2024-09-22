const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken"); // JSON web token
const JWT_SECRET =  "strawberrymilk"; // JSON web token secret

const tokenBlacklist = new Set();

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    global.db.get(query, [email, password], (err, row) => {
        if (err) {
            next(err);
        } 
        else {
            // Login successful
            if (row) {
                const token = jwt.sign({ email: row.email, role: row.role }, JWT_SECRET, {
                    expiresIn: "2h" // Token expiration time is set to 2 hours.
                });
                res.status(200).json({
                    success: true,
                    row,
                    token
                });
            } 
            else {
                res.status(401).json({ 
                    success: false,
                    message: "Invalid email or password" 
                });
            }
        }
    });
});

router.post("/verify-token", (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ 
                authenticated: false,
                message: "Unauthorized: JWT Token is invalid" 
            });
        } 
        else {
            return res.status(200).json({ 
                authenticated: true,
                decodedToken
            });
            // next();
        }
    });
})

module.exports = router;