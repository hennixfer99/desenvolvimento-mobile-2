const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

// Aponta para database/db.json — o mesmo arquivo que o projeto carrega como seed
const DB_PATH = path.join(__dirname, "..", "database", "db.json");

app.use(cors());
app.use(express.json());

function readDb() {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

function writeDb(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function generateToken() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function auth(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token não fornecido" });
    const db = readDb();
    const session = db.sessions.find((s) => s.token === token);
    if (!session) return res.status(401).json({ error: "Sessão inválida" });
    req.user = session;
    next();
}

// ─── HEALTH CHECK ───────────────────────────────────

app.get("/api/ping", (_req, res) => {
    res.json({ ok: true });
});

// ─── AUTH ────────────────────────────────────────────

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const db = readDb();
    const user = db.users.find(
        (u) => u.username === username && u.password === password
    );
    if (!user) return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const token = generateToken();
    db.sessions.push({ token, userId: user.id, username: user.username, role: user.role });
    writeDb(db);

    res.json({
        success: true,
        token,
        user: { id: user.id, username: user.username, role: user.role },
    });
});

app.post("/api/logout", auth, (req, res) => {
    const db = readDb();
    db.sessions = db.sessions.filter((s) => s.token !== req.user.token);
    writeDb(db);
    res.json({ success: true });
});

app.get("/api/me", auth, (req, res) => {
    res.json({ user: { userId: req.user.userId, username: req.user.username, role: req.user.role } });
});

// ─── SUBMISSIONS ────────────────────────────────────

app.get("/api/submissions", auth, (req, res) => {
    const db = readDb();
    res.json(db.submissions);
});

app.post("/api/submissions", (req, res) => {
    const db = readDb();
    const submission = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
        status: "pendente",
    };
    db.submissions.unshift(submission);
    writeDb(db);
    res.status(201).json(submission);
});

app.put("/api/submissions/:id", auth, (req, res) => {
    const db = readDb();
    const index = db.submissions.findIndex((s) => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Não encontrada" });
    db.submissions[index] = { ...db.submissions[index], ...req.body };
    writeDb(db);
    res.json(db.submissions[index]);
});

app.delete("/api/submissions/:id", auth, (req, res) => {
    const db = readDb();
    const before = db.submissions.length;
    db.submissions = db.submissions.filter((s) => s.id !== req.params.id);
    if (db.submissions.length === before) {
        return res.status(404).json({ error: "Não encontrada" });
    }
    writeDb(db);
    res.json({ success: true });
});

// ─── START ──────────────────────────────────────────

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Imperial API rodando em http://0.0.0.0:${PORT}`);
    console.log(`Banco: ${DB_PATH}`);
});
