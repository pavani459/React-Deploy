




import React, { useState } from "react";

export default function ReferralDashboard({ onLogout, onNavigate, userRole }) {
  /* ---------------------- CONSTANTS ---------------------- */
  const NEW_REFERRED_BY_NAME = "pavani";
  const NEW_REFERRED_BY_MOBILE = "9347163592";

  /* ---------------------- UI STATE ---------------------- */
  const [activePage, setActivePage] = useState("referral");
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [search, setSearch] = useState("");

  const theme = {
    bg: darkMode ? "#0b1a13" : "#f1f8f5",
    card: darkMode ? "#132820" : "#ffffff",
    text: darkMode ? "#e6f4ee" : "#0b1a13",
    sub: darkMode ? "#88bfa3" : "#4b6257",
    primary: darkMode ? "#34d399" : "#0d9488",
    accent: darkMode ? "#1f3630" : "#b6ead7",
    border: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
    soft: darkMode ? "rgba(52,211,153,0.08)" : "rgba(13,148,136,0.05)",
  };

  /* ---------------------- DATA ---------------------- */
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      name: "user one",
      mobile: "9876543210",
      alternateMobile: "9999912345",
      referredBy: NEW_REFERRED_BY_NAME,
      referrerMobile: NEW_REFERRED_BY_MOBILE,
      dateOfBirth: "1990-01-01",
      adharNo: "123456789012",
    },
  ]);

  const [verifiedUsers, setVerifiedUsers] = useState([
    {
      firstName: "Rajesh",
      lastName: "B",
      mobile: "8897399266",
      formFilled: "Yes",
      referredBy: NEW_REFERRED_BY_NAME,
      referrerMobile: NEW_REFERRED_BY_MOBILE,
      verified: "Yes",
    },
  ]);

  /* ---------------------- FORM STATE ---------------------- */
  const emptyForm = {
    firstName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    dateOfBirth: "",
    adharNo: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* ---------------------- VERIFIED FORM ---------------------- */
  const [verifiedForm, setVerifiedForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    formFilled: "Yes",
    referredBy: NEW_REFERRED_BY_NAME,
    referrerMobile: NEW_REFERRED_BY_MOBILE,
    verified: "Yes",
  });
  const [editingVerifiedIndex, setEditingVerifiedIndex] = useState(null);

  /* ---------------------- FUNCTIONS ---------------------- */

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setReferrals((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
              ...r,
              alternateMobile: form.alternateMobile,
              dateOfBirth: form.dateOfBirth,
              adharNo: form.adharNo,
              name: `${form.firstName} ${form.lastName}`,
            }
            : r
        )
      );
    } else {
      const id = referrals.length ? referrals[referrals.length - 1].id + 1 : 1;

      // ADD TO REFERRAL TABLE
      setReferrals((prev) => [
        ...prev,
        {
          id,
          name: `${form.firstName} ${form.lastName}`,
          mobile: form.mobile,
          alternateMobile: form.alternateMobile,
          dateOfBirth: form.dateOfBirth,
          adharNo: form.adharNo,
          referredBy: NEW_REFERRED_BY_NAME,
          referrerMobile: NEW_REFERRED_BY_MOBILE,
        },
      ]);

      // AUTO-ADD TO VERIFIED USERS
      setVerifiedUsers((prev) => [
        ...prev,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          mobile: form.mobile,
          formFilled: "Yes",
          referredBy: NEW_REFERRED_BY_NAME,
          referrerMobile: NEW_REFERRED_BY_MOBILE,
          verified: "Yes",
        },
      ]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const editReferral = (r) => {
    const [fn, ln] = r.name.split(" ");
    setForm({
      firstName: fn || "",
      lastName: ln || "",
      mobile: r.mobile,
      alternateMobile: r.alternateMobile,
      adharNo: r.adharNo,
      dateOfBirth: r.dateOfBirth,
    });
    setEditingId(r.id);
    setShowForm(true);
  };

  const deleteReferral = (id) => {
    if (window.confirm("Delete referral?")) {
      setReferrals((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const editVerified = (i) => {
    setVerifiedForm({ ...verifiedUsers[i] });
    setEditingVerifiedIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveVerified = (e) => {
    e.preventDefault();
    setVerifiedUsers((prev) =>
      prev.map((u, i) => (i === editingVerifiedIndex ? verifiedForm : u))
    );
    setEditingVerifiedIndex(null);
  };

  const deleteVerifiedUser = (i) => {
    if (window.confirm("Delete verified user?")) {
      setVerifiedUsers((prev) => prev.filter((_, idx) => idx !== i));
    }
  };

  /* ---------------------- SORT & FILTER ---------------------- */

  const filterText = search.toLowerCase();

  const sortedReferrals = [...referrals].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "mobile") return a.mobile.localeCompare(b.mobile);
    return b.id - a.id; // latest
  });

  const filtered = sortedReferrals.filter(
    (r) =>
      r.name.toLowerCase().includes(filterText) ||
      r.mobile.includes(filterText) ||
      r.referrerMobile.includes(filterText)
  );

  const filteredVerified = verifiedUsers.filter(
    (u) =>
      u.firstName.toLowerCase().includes(filterText) ||
      u.lastName.toLowerCase().includes(filterText) ||
      u.mobile.includes(filterText)
  );

  /* ---------------------- STYLES ---------------------- */
  const card = {
    background: theme.card,
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  };

  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${theme.border}`,
    background: theme.soft,
    color: theme.text,
  };

  const buttonPrimary = {
    background: theme.primary,
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  };

  const buttonEdit = {
    background: "transparent",
    color: theme.primary,
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  };

  const buttonDelete = {
    background: "transparent",
    color: "#ef4444",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  };

  const tableHeaderStyle = {
    textAlign: "left",
    padding: "12px 10px",
    color: theme.sub,
    fontWeight: 700,
    fontSize: 14,
  };

  const tableCellStyle = {
    padding: "14px 10px",
    color: theme.text,
    fontSize: 14,
  };

  /* ---------------------- RENDER ---------------------- */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        padding: 20,
        display: "flex",
        gap: 20,
      }}
    >
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 h-[95vh] sticky top-5 flex flex-col">
        <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
          Markwave
        </h2>

        <button
          onClick={() => setActivePage("referral")}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold mb-3 transition-all ${activePage === "referral"
            ? "bg-teal-600 text-white"
            : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
        >
          Referrals
        </button>

        <button
          onClick={() => setActivePage("verified")}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold mb-3 transition-all ${activePage === "verified"
            ? "bg-teal-600 text-white"
            : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
        >
          Verified Users
        </button>

        <button
          onClick={() => {
            if (userRole === "superadmin") {
              if (typeof onNavigate === "function") onNavigate("products");
              else setActivePage("products");
            }
          }}
          disabled={userRole !== "superadmin"}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold mt-1 transition-all ${userRole === "superadmin"
              ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
              : "bg-gray-200 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50"
            }`}
          title={userRole !== "superadmin" ? "Only SuperAdmin can access Products" : ""}
        >
          Products
        </button>

        <div className="mt-auto">
          <button
            onClick={onLogout}
            className="btn-primary w-full"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* TOP NAVBAR */}
        <div className="sticky top-2.5 nav-bar z-10">
          <h1 className="text-2xl font-bold m-0 whitespace-nowrap">Referral Dashboard</h1>

          <div className="flex items-center gap-3 flex-1 justify-end flex-wrap">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 w-48"
            />

            <button
              onClick={() => setDarkMode((d) => !d)}
              className="btn-primary whitespace-nowrap"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* SORT + ADD REFERRAL */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 w-56"
          >
            <option value="latest">Sort: Latest</option>
            <option value="name">Sort: Name</option>
            <option value="mobile">Sort: Mobile</option>
          </select>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(emptyForm);
              setEditingId(null);
            }}
            className="btn-primary"
          >
            {showForm ? "Cancel" : "Add Referral"}
          </button>
        </div>

        {/* REFERRAL FORM */}
        {showForm && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Mobile</label>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={editingId ? undefined : handleChange}
                  readOnly={editingId ? true : false}
                  required
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 dark:disabled:bg-slate-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Alternate Number</label>
                <input
                  name="alternateMobile"
                  value={form.alternateMobile}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">DOB</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Aadhar</label>
                <input
                  name="adharNo"
                  maxLength={12}
                  value={form.adharNo}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="btn-primary col-span-full"
              >
                {editingId ? "Save Changes" : "Submit"}
              </button>
            </form>
          </div>
        )}

        {/* REFERRALS TABLE */}
        {activePage === "referral" && (
          <div style={card}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Mobile</th>
                  <th style={tableHeaderStyle}>Alternate</th>
                  <th style={tableHeaderStyle}>DOB</th>
                  <th style={tableHeaderStyle}>Aadhar</th>
                  <th style={tableHeaderStyle}>Referral</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td style={tableCellStyle}>{r.name}</td>
                    <td style={tableCellStyle}>{r.mobile}</td>
                    <td style={tableCellStyle}>{r.alternateMobile}</td>
                    <td style={tableCellStyle}>{r.dateOfBirth}</td>
                    <td style={tableCellStyle}>{r.adharNo}</td>
                    <td style={tableCellStyle}>{r.referredBy}</td>

                    <td style={tableCellStyle}>
                      <button style={buttonEdit} onClick={() => editReferral(r)}>
                        Edit
                      </button>
                      <button
                        style={{ ...buttonDelete, marginLeft: 8 }}
                        onClick={() => deleteReferral(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: 10, color: theme.sub }}
                    >
                      No referrals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* VERIFIED USERS PAGE */}
        {activePage === "verified" && (
          <div style={card}>
            <h2>Verified Users</h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>First Name</th>
                  <th style={tableHeaderStyle}>Last Name</th>
                  <th style={tableHeaderStyle}>Mobile</th>
                  <th style={tableHeaderStyle}>Form Filled</th>
                  <th style={tableHeaderStyle}>Verified</th>
                  <th style={tableHeaderStyle}>Referred By</th>
                  <th style={tableHeaderStyle}>Referrer Mobile</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVerified.map((u, i) => (
                  <tr key={i}>
                    <td style={tableCellStyle}>{u.firstName}</td>
                    <td style={tableCellStyle}>{u.lastName}</td>
                    <td style={tableCellStyle}>{u.mobile}</td>
                    <td style={tableCellStyle}>{u.formFilled}</td>
                    <td style={tableCellStyle}>{u.verified}</td>
                    <td style={tableCellStyle}>{u.referredBy}</td>
                    <td style={tableCellStyle}>{u.referrerMobile}</td>

                    <td style={tableCellStyle}>
                      <button style={buttonEdit} onClick={() => editVerified(i)}>
                        Edit
                      </button>

                      <button
                        style={{ ...buttonDelete, marginLeft: 8 }}
                        onClick={() => deleteVerifiedUser(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredVerified.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: 12, color: theme.sub }}
                    >
                      No verified users
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* EDIT VERIFIED FORM */}
            {editingVerifiedIndex !== null && (
              <form
                onSubmit={saveVerified}
                style={{
                  marginTop: 16,
                  display: "grid",
                  gap: 10,
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }}
              >
                <input
                  style={input}
                  placeholder="First Name"
                  value={verifiedForm.firstName}
                  onChange={(e) =>
                    setVerifiedForm((v) => ({ ...v, firstName: e.target.value }))
                  }
                />

                <input
                  style={input}
                  placeholder="Last Name"
                  value={verifiedForm.lastName}
                  onChange={(e) =>
                    setVerifiedForm((v) => ({ ...v, lastName: e.target.value }))
                  }
                />

                <input style={input} value={verifiedForm.mobile} readOnly />

                <select
                  style={input}
                  value={verifiedForm.formFilled}
                  onChange={(e) =>
                    setVerifiedForm((v) => ({ ...v, formFilled: e.target.value }))
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <select
                  style={input}
                  value={verifiedForm.verified}
                  onChange={(e) =>
                    setVerifiedForm((v) => ({ ...v, verified: e.target.value }))
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <input style={input} value={verifiedForm.referredBy} readOnly />
                <input style={input} value={verifiedForm.referrerMobile} readOnly />

                <button type="submit" style={{ ...buttonPrimary, gridColumn: "1 / -1" }}>
                  Save Verified User
                </button>
              </form>
            )}
          </div>
        )}

        {/* PRODUCTS PAGE */}
        {activePage === "products" && (
          <div style={card}>
            <h2>Products</h2>
            <p style={{ color: theme.sub }}>Products page works!</p>
          </div>
        )}
      </main>
    </div>
  );
}
