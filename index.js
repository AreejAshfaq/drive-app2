const express = require("express");
const session = require("express-session");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static("public"));

// Route to handle root
app.get("/", (req, res) => {
    if (req.session.userid) {
        res.send("nice effort");
    } else {
        res.redirect("/signin");
    }
});

// Route to handle signin
app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signin.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
