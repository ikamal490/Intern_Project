import Products from "./Products";

function Dashboard({ page, setPage }) {
  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3 style={styles.logo}>Productr</h3>

        <ul style={styles.menu}>
          <li
            style={page === "home" ? styles.active : {}}
            onClick={() => setPage("home")}
          >
            Home
          </li>

          <li
            style={page === "products" ? styles.active : {}}
            onClick={() => setPage("products")}
          >
            Products
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      {page === "home" && (
        <div style={styles.main}>
          <div style={styles.topbar}>
            <div style={styles.tabs}>
              <span style={styles.tabActive}>Published</span>
              <span style={styles.tab}>Unpublished</span>
            </div>
          </div>

          <div style={styles.empty}>
            <div style={styles.icon}>⬜ ⬜ ⬜ ⬜</div>
            <h3>No Published Products</h3>
            <p>Your published products will appear here</p>
          </div>
        </div>
      )}

      {page === "products" && <Products />}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    cursor: "pointer",
  },
  active: {
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#3b82f6",
  },
  main: {
    flex: 1,
    background: "#f8fafc",
  },
  topbar: {
    padding: "15px 25px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
  },
  tabs: {
    display: "flex",
    gap: "20px",
  },
  tabActive: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  tab: {
    color: "#6b7280",
  },
  empty: {
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#475569",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "10px",
  },
};

export default Dashboard;
