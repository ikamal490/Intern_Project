import { useRef, useState } from "react";

function AddProductModal({ onClose, onCreate }) {
  const fileRef = useRef(null);

  const [product, setProduct] = useState({
    name: "",
    type: "",
    stock: "",
    mrp: "",
    price: "",
    brand: "",
    exchange: "Yes",
    images: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      images: [...product.images, ...files],
    });
  };

  const removeImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleCreate = () => {
    let newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Please enter product name";
    }

    if (!product.type) {
      newErrors.type = "Please select product type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: product.name,
      type: product.type,
      stock: product.stock,
      mrp: product.mrp,
      price: product.price,
      brand: product.brand,
      exchange: product.exchange,
      images: product.images.map((img) => URL.createObjectURL(img)),
      status: "unpublished",
    };

    onCreate(newProduct);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3>Add Product</h3>
          <span style={styles.close} onClick={onClose}>✕</span>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          <label>Product Name</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.name ? "#ef4444" : "#cbd5e1",
            }}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <label>Product Type</label>
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.type ? "#ef4444" : "#cbd5e1",
            }}
          >
            <option value="">Select product type</option>
            <option value="Foods">Foods</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Beauty Products">Beauty Products</option>
            <option value="Others">Others</option>
          </select>
          {errors.type && <p style={styles.error}>{errors.type}</p>}

          <label>Quantity Stock</label>
          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            style={styles.input}
          />

          <label>MRP</label>
          <input
            name="mrp"
            value={product.mrp}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Selling Price</label>
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Brand Name</label>
          <input
            name="brand"
            value={product.brand}
            onChange={handleChange}
            style={styles.input}
          />

          {/* IMAGE UPLOAD */}
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
            {product.images.map((img, index) => (
              <div key={index} style={styles.imageBox}>
                <img
                  src={URL.createObjectURL(img)}
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
            value={product.exchange}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <button style={styles.button} onClick={handleCreate}>
            Create
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
    fontSize: "18px",
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
  error: {
    color: "#ef4444",
    fontSize: "11px",
    marginBottom: "4px",
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
    textAlign: "right",
    borderTop: "1px solid #e5e7eb",
  },
  button: {
    padding: "8px 16px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AddProductModal;
