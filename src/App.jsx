

import React, { useState, useEffect } from "react";
import Loginpage from "./components/Loginpage";
import ReferralDashboard from "./components/ReferralDashboard";
import ProductDashboard from "./components/ProductDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const [activeView, setActiveView] = useState("referrals");

  // handle login from Loginpage
  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setIsAuthenticated(false);
    setRole(null);
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <>
          {/* If user is NOT superadmin — block products */}
          {activeView === "products" && role !== "superadmin" ? (
            <ReferralDashboard
              onLogout={handleLogout}
              onNavigate={(v) => setActiveView(v)}
              userRole={role}
            />
          ) : activeView === "referrals" ? (
            <ReferralDashboard
              onLogout={handleLogout}
              onNavigate={(v) => setActiveView(v)}
              userRole={role}
            />
          ) : (
            <ProductDashboard onBack={() => setActiveView("referrals")} />
          )}
        </>
      ) : (
        <Loginpage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;






