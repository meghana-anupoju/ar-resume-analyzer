const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, "..", "users.json");
const LOGIN_LOGS_FILE = path.join(__dirname, "..", "login_logs.json");
const RESUME_FILE = path.join(__dirname, "..", "resumes.json");

const JWT_SECRET = "super_secret_key_change_this";

// ================= INITIAL FILE CREATION =================

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(LOGIN_LOGS_FILE)) {
    fs.writeFileSync(LOGIN_LOGS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(RESUME_FILE)) {
    fs.writeFileSync(RESUME_FILE, JSON.stringify({}, null, 2));
}

// ================= ROOT ROUTE =================
// Always serve login.html at root

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/login.html"));
});

// ================= SIGNUP =================

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ success: false, message: "Email and password required" });

    try {
        const users = JSON.parse(fs.readFileSync(USERS_FILE));

        if (users.find(user => user.email === email)) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        res.json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Signup failed" });
    }
});

// ================= LOGIN =================

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ success: false, message: "Email and password required" });

    try {
        const users = JSON.parse(fs.readFileSync(USERS_FILE));

        let user = users.find(u => u.email === email);

        // If user doesn't exist, create new user (auto-signup on first login)
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = {
                id: Date.now(),
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            };
            users.push(user);
            fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        } else {
            // User exists, verify password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Log login
        const logs = JSON.parse(fs.readFileSync(LOGIN_LOGS_FILE));
        logs.push({
            userId: user.id,
            email: user.email,
            loginTime: new Date().toISOString()
        });
        fs.writeFileSync(LOGIN_LOGS_FILE, JSON.stringify(logs, null, 2));

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
});

// ================= JWT MIDDLEWARE =================

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

// ================= SAVE RESUME =================

app.post("/saveResume", verifyToken, (req, res) => {
    const resumeData = req.body;

    fs.writeFileSync(RESUME_FILE, JSON.stringify(resumeData, null, 2));

    res.json({ success: true, message: "Resume Saved Successfully" });
});

// ================= GET RESUME =================

app.get("/getResume", verifyToken, (req, res) => {
    const data = JSON.parse(fs.readFileSync(RESUME_FILE));
    res.json(data);
});

// ================= VIEW USERS =================

app.get("/users", (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    res.json(users);
});

// ================= VIEW LOGIN LOGS =================

app.get("/login-logs", (req, res) => {
    const logs = JSON.parse(fs.readFileSync(LOGIN_LOGS_FILE));
    res.json(logs);
});

// ================= VALIDATE TOKEN =================

app.get('/validateToken', verifyToken, (req, res) => {
    return res.json({ success: true, valid: true, user: req.user });
});

// ================= SERVE ALL CLIENT STATIC FILES =================

// Serve all static files from client directory (login, signup, index, ar, assets)
// This comes AFTER specific routes so they take precedence
app.use(express.static(path.join(__dirname, '../client')));

// ================= START SERVER =================

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
