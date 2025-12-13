
import React, { useState } from "react";

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

        if (username === "superadmin" && password === "superadmin@20205") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", "superadmin");
            onLogin("superadmin");
            return;
        }

        setError("Invalid username or password.");
    };

    return (
        <div className="flex min-h-screen w-full font-sans">

            <aside className="w-64 bg-white/90 backdrop-blur-lg shadow-lg flex flex-col gap-5 justify-center items-center text-center p-10">
                <h2 className="text-3xl font-bold text-gray-900">Welcome to Markwave</h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Sign in to access your Markwave dashboard.
                </p>
            </aside>

            <div className="flex-1 flex justify-center items-center bg-cover bg-center bg-fixed p-5"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(153, 49, 49, 0.6), rgba(30,64,175,0.6)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80')"
                }}>
                <div className="max-w-sm w-full bg-white rounded-xl shadow-2xl p-10">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Markwave</h2>
                    <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />

                        <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                        />

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition duration-300 mt-2"
                        >
                            Sign In
                        </button>

                        {error && <div className="text-red-500 text-center text-sm mt-4">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;




