import { useState } from "react";

function Login({ onLogin }) {
  const [value, setValue] = useState("");

  const handleLogin = () => {
    if (value.trim() === "") {
      alert("Please enter Email or Phone number");
      return;
    }
    onLogin();
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <div style={styles.imageCard}>
          <img
            src="/src/assets/Frame2.png"
            alt="left visual"
            style={styles.leftImage}
          />
          <p style={styles.imageText}>
            Uplift your product to market
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login to your Product Account</h2>

          <input
            type="text"
            placeholder="Email or Phone number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>

          <p style={styles.signup}>
            Don’t have a Product Account?{" "}
            <span style={styles.link}>Sign up here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {  
    height: "100vh",
    display: "flex",
  },
  left: {
    flex: 1,
    background: "#eef1f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ORANGE CARD */


  /* IMAGE FIX */
  leftImage: {
    width: "300px",
    height: "450px",
    maxHeight: "320px",        // ✅ keeps image inside orange box
    objectFit: "contain",     // ✅ NO zoom / NO crop
  },

  imageText: {
    fontSize: "14px",
    textAlign: "center",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
  },
  card: {
    background: "#fff",
    padding: "40px",
    width: "380px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  signup: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#1d4ed8",
    cursor: "pointer",
  },
};

export default Login;
