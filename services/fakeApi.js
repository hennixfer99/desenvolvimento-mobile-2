import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../constants/api";
import SEED_DB from "../database/db.json";

const DB_KEY = "@imperial_db";
const TOKEN_KEY = "@imperial_token";
const USER_KEY = "@imperial_user";

let serverOnline = false;

async function getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

async function authHeaders() {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

async function tryFetch(url, options = {}) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);
        serverOnline = true;
        return res;
    } catch {
        return null;
    }
}

async function readLocal() {
    try {
        const raw = await AsyncStorage.getItem(DB_KEY);
        if (!raw) {
            const seed = JSON.parse(JSON.stringify(SEED_DB));
            await writeLocal(seed);
            return seed;
        }
        return JSON.parse(raw);
    } catch {
        return JSON.parse(JSON.stringify(SEED_DB));
    }
}

async function writeLocal(data) {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(data, null, 2));
}

export const initApi = async () => {
    await readLocal();

    try {
        const res = await fetch(`${API_BASE}/api/ping`, { method: "GET" });
        const data = await res.json();
        serverOnline = data?.ok === true;
    } catch {
        serverOnline = false;
    }
    console.log(`Imperial API: ${serverOnline ? "servidor online" : "modo local (AsyncStorage)"}`);
};

export const login = async (username, password) => {
    const res = await tryFetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (res) {
        try {
            const data = await res.json();
            if (!res.ok) return { success: false, error: data.error };
            await AsyncStorage.setItem(TOKEN_KEY, data.token);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
            return { success: true, user: data.user };
        } catch {  }
    }

    try {
        const db = await readLocal();
        const user = db.users.find(
            (u) => u.username === username && u.password === password
        );
        if (!user) return { success: false, error: "Usuário ou senha inválidos" };
        const token = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const userData = { id: user.id, username: user.username, role: user.role };
        db.sessions.push({ token, userId: user.id, username: user.username, role: user.role });
        await writeLocal(db);
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        return { success: true, user: userData };
    } catch (err) {
        console.warn("login erro:", err);
        return { success: false, error: "Erro ao realizar login" };
    }
};

export const logout = async () => {
    const headers = await authHeaders();
    const res = await tryFetch(`${API_BASE}/api/logout`, { method: "POST", headers });
    if (!res) {
        try {
            const token = await getToken();
            if (token) {
                const db = await readLocal();
                db.sessions = db.sessions.filter((s) => s.token !== token);
                await writeLocal(db);
            }
        } catch {  }
    }
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
};

export const getSession = async () => {
    const token = await getToken();
    if (!token) return null;

    const headers = await authHeaders();
    const res = await tryFetch(`${API_BASE}/api/me`, { headers });
    if (res) {
        try {
            if (!res.ok) {
                await AsyncStorage.removeItem(TOKEN_KEY);
                await AsyncStorage.removeItem(USER_KEY);
                return null;
            }
            const data = await res.json();
            return data.user;
        } catch {  }
    }

    try {
        const db = await readLocal();
        const session = db.sessions.find((s) => s.token === token);
        if (!session) {
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);
            return null;
        }
        return { userId: session.userId, username: session.username, role: session.role };
    } catch {
        return null;
    }
};

export const getSubmissions = async () => {
    const headers = await authHeaders();
    const res = await tryFetch(`${API_BASE}/api/submissions`, { headers });
    if (res && res.ok) {
        try { return await res.json(); } catch {}
    }

    try {
        const db = await readLocal();
        return db.submissions || [];
    } catch {
        return [];
    }
};

export const addSubmission = async (submission) => {
    const res = await tryFetch(`${API_BASE}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
    });
    if (res && res.ok) {
        try { return await res.json(); } catch {}
    }

    try {
        const db = await readLocal();
        const newSub = {
            id: Date.now().toString(),
            ...submission,
            createdAt: new Date().toISOString(),
            status: "pendente",
        };
        db.submissions.unshift(newSub);
        await writeLocal(db);
        return newSub;
    } catch {
        return null;
    }
};

export const updateSubmission = async (id, updates) => {
    const headers = await authHeaders();
    const res = await tryFetch(`${API_BASE}/api/submissions/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updates),
    });
    if (res && res.ok) {
        try { return { success: true, submission: await res.json() }; } catch {}
    }

    try {
        const db = await readLocal();
        const index = db.submissions.findIndex((s) => s.id === id);
        if (index === -1) return { success: false };
        db.submissions[index] = { ...db.submissions[index], ...updates };
        await writeLocal(db);
        return { success: true, submission: db.submissions[index] };
    } catch {
        return { success: false };
    }
};

export const deleteSubmission = async (id) => {
    const headers = await authHeaders();
    const res = await tryFetch(`${API_BASE}/api/submissions/${id}`, {
        method: "DELETE",
        headers,
    });
    if (res && res.ok) {
        return { success: true };
    }

    try {
        const db = await readLocal();
        const before = db.submissions.length;
        db.submissions = db.submissions.filter((s) => s.id !== id);
        if (db.submissions.length === before) return { success: false };
        await writeLocal(db);
        return { success: true };
    } catch {
        return { success: false };
    }
};

