

import React, { useState } from "react";

const styles = {
    layout: {
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        fontFamily: "Inter, system-ui, sans-serif",
    },
    background: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(153, 49, 49, 0.6), rgba(30,64,175,0.6)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: 20,
    },
    sidebar: {
        width: 260,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        padding: "40px 20px",
        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    sidebarTitle: {
        fontSize: 26,
        fontWeight: 700,
        color: "#1f2937",
        textAlign: "center",
    },
    sidebarDesc: {
        fontSize: 15,
        color: "#4b5563",
        textAlign: "center",
        lineHeight: 1.7,
        padding: "0 8px",
    },
    card: {
        maxWidth: 420,
        width: "100%",
        padding: "40px 30px",
        borderRadius: 12,
        boxShadow: "0 20px 80px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#ffffff",
    },
    heading: {
        fontSize: 28,
        color: "#1f2937",
        textAlign: "center",
        fontWeight: 700,
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 30,
    },
    label: {
        display: "block",
        marginBottom: 8,
        fontSize: 14,
        color: "#374151",
        fontWeight: "600",
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 14,
        boxSizing: "border-box",
        marginBottom: 16,
    },
    button: {
        width: "100%",
        padding: "12px",
        borderRadius: 8,
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: "bold",
        transition: "0.3s ease",
        marginTop: 10,
    },
    error: {
        color: "#ef4444",
        marginTop: 15,
        textAlign: "center",
        fontSize: 14,
    },
    success: {
        color: "#10b981",
        marginTop: 15,
        textAlign: "center",
        fontSize: 14,
    },
};

function Loginpage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // ROLE-BASED USERS
        if (username === "admin" && password === "Markwave@2025") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", "admin");
            onLogin("admin");
            return;
        }

        if (username === "superadmin" && password === "superadmin@2025") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", "superadmin");
            onLogin("superadmin");
            return;
        }

        setError("Invalid username or password.");
    };

    return (
        <div style={styles.layout}>

            <aside style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Welcome to Markwave</h2>
                <p style={styles.sidebarDesc}>
                    Sign in to access your Markwave dashboard.
                </p>
            </aside>

            <div style={styles.background}>
                <div style={styles.card}>
                    <h2 style={styles.heading}>Markwave</h2>
                    <p style={styles.subHeading}>Sign in to your account</p>

                    <form onSubmit={handleSubmit}>
                        <label style={styles.label}>Username</label>
                        <input style={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label style={styles.label}>Password</label>
                        <input type="password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" style={styles.button}>Sign In</button>

                        {error && <div style={styles.error}>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;




