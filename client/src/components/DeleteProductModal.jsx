function DeleteProductModal({ productName, onClose, onConfirm }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3>Delete Product</h3>
          <span style={styles.close} onClick={onClose}>
            ✕
          </span>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          Are you sure you really want to delete this Product{" "}
          <strong>“{productName}”</strong> ?
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <button style={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.delete} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    width: "360px",
    background: "#fff",
    borderRadius: "8px",
  },
  header: {
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb",
  },
  close: {
    cursor: "pointer",
  },
  body: {
    padding: "16px",
    fontSize: "14px",
    color: "#374151",
  },
  footer: {
    padding: "14px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid #e5e7eb",
  },
  cancel: {
    padding: "6px 14px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  delete: {
    padding: "6px 14px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DeleteProductModal;
