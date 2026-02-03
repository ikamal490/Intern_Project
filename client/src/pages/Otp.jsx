import { useState } from "react";

function Otp({ onSuccess }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;

    // allow only single digit number
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    // dummy correct OTP
    if (enteredOtp !== "123456") {
      setError("Please enter a valid OTP");
      return;
    }

    setError("");
    onSuccess(); // move to Dashboard
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <div style={styles.imageCard}>
          <p style={styles.imageText}>Uplift your product to market</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login to your Product Account</h2>
          <p style={styles.subtitle}>Enter OTP</p>

          <div style={styles.otpBox}>
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                style={styles.otpInput}
              />
            ))}
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} onClick={handleSubmit}>
            Enter your OTP
          </button>

          <p style={styles.resend}>
            Didn’t receive OTP? <span style={styles.link}>Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
}

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
  imageCard: {
    width: "300px",
    height: "450px",
    background: "linear-gradient(180deg, #ff9f43, #ff6f00)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "20px",
    color: "#fff",
    fontWeight: "bold",
  },
  imageText: {
    fontSize: "14px",
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
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
  },
  otpBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  otpInput: {
    width: "45px",
    height: "45px",
    fontSize: "18px",
    textAlign: "center",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
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
  resend: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#1d4ed8",
    cursor: "pointer",
  },
};

export default Otp;
