import { useRef, useState } from "react";

function EditProductModal({ product, onClose, onUpdate, onDelete }) {
  const fileRef = useRef(null);

  const [data, setData] = useState({
    ...product,
    images: product.images || [],
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      URL.createObjectURL(file)
    );

    setData({
      ...data,
      images: [...data.images, ...newImages],
    });
  };

  const removeImage = (index) => {
    setData({
      ...data,
      images: data.images.filter((_, i) => i !== index),
    });
  };

  const handleUpdate = () => {
    onUpdate(data);
    onClose();
  };

  const handleDelete = () => {
    onDelete(data); // IMPORTANT: send full product
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3>Edit Product</h3>
          <span style={styles.close} onClick={onClose}>
            ✕
          </span>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          <label>Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Product Type</label>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Foods">Foods</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Beauty Products">Beauty Products</option>
            <option value="Others">Others</option>
          </select>

          <label>Quantity Stock</label>
          <input
            name="stock"
            value={data.stock}
            onChange={handleChange}
            style={styles.input}
          />

          <label>MRP</label>
          <input
            name="mrp"
            value={data.mrp}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Selling Price</label>
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Brand Name</label>
          <input
            name="brand"
            value={data.brand}
            onChange={handleChange}
            style={styles.input}
          />

          {/* IMAGES */}
          <label>Upload Product Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileRef}
            onChange={handleImagesSelect}
            style={{ display: "none" }}
          />

          <div style={styles.imageRow}>
            {data.images.map((img, index) => (
              <div key={index} style={styles.imageBox}>
                <img
                  src={img}
                  alt="preview"
                  style={styles.image}
                />
                <span
                  style={styles.remove}
                  onClick={() => removeImage(index)}
                >
                  ✕
                </span>
              </div>
            ))}

            <div
              style={styles.addMore}
              onClick={() => fileRef.current.click()}
            >
              Add More Photos
            </div>
          </div>

          <label>Exchange or return eligibility</label>
          <select
            name="exchange"
            value={data.exchange}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <button
            style={styles.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            style={styles.updateBtn}
            onClick={handleUpdate}
          >
            Update
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
    zIndex: 1000,
  },
  modal: {
    width: "440px",
    background: "#fff",
    borderRadius: "8px",
  },
  header: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb",
  },
  close: {
    cursor: "pointer",
  },
  body: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "13px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #cbd5e1",
  },
  imageRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  imageBox: {
    position: "relative",
    width: "48px",
    height: "48px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  remove: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#ef4444",
    color: "#fff",
    fontSize: "12px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  addMore: {
    border: "1px dashed #cbd5e1",
    padding: "10px",
    fontSize: "12px",
    cursor: "pointer",
    color: "#2563eb",
  },
  footer: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  updateBtn: {
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default EditProductModal;
