import { useState } from "react";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

function Products() {
  const [products, setProducts] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= CREATE ================= */
  const handleCreateProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  /* ================= ASK DELETE ================= */
  const askDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  /* ================= CONFIRM DELETE ================= */
  const confirmDeleteProduct = () => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== selectedProduct.id)
    );
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  /* ================= EDIT ================= */
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  /* ================= UPDATE ================= */
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  /* ================= PUBLISH ================= */
  const togglePublish = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status:
                p.status === "published"
                  ? "unpublished"
                  : "published",
            }
          : p
      )
    );
  };

  return (
    <div style={styles.main}>
      {/* ================= TOP BAR ================= */}
      <div style={styles.topbar}>
        <h3>Products</h3>
        <button
          style={styles.addBtn}
          onClick={() => setShowAddModal(true)}
        >
          + Add Products
        </button>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {products.length === 0 && (
        <div style={styles.empty}>
          <div style={styles.icon}>⬜ ⬜ ⬜ ⬜</div>
          <h3>Feels a little empty over here...</h3>
          <p>You can create products without connecting store</p>

          <button
            style={styles.button}
            onClick={() => setShowAddModal(true)}
          >
            Add your Products
          </button>
        </div>
      )}

      {/* ================= PRODUCT GRID ================= */}
      {products.length > 0 && (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product.id} style={styles.card}>
              {/* DELETE ICON */}
              <span
                style={styles.deleteIcon}
                onClick={() => askDeleteProduct(product)}
              >
                🗑
              </span>

              {/* IMAGE */}
              <img
                src={product.images[0]}
                alt={product.name}
                style={styles.image}
              />

              {/* DETAILS */}
              <h4>{product.name}</h4>
              <p style={styles.text}>Product type - {product.type}</p>
              <p style={styles.text}>Quantity Stock - {product.stock}</p>
              <p style={styles.text}>MRP - ₹ {product.mrp}</p>
              <p style={styles.text}>
                Selling Price - ₹ {product.price}
              </p>
              <p style={styles.text}>Brand Name - {product.brand}</p>
              <p style={styles.text}>
                Exchange Eligibility - {product.exchange}
              </p>

              {/* ACTIONS */}
              <div style={styles.actions}>
                <button
                  style={
                    product.status === "published"
                      ? styles.unpublish
                      : styles.publish
                  }
                  onClick={() => togglePublish(product.id)}
                >
                  {product.status === "published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button
                  style={styles.edit}
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODALS ================= */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleCreateProduct}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateProduct}
          onDelete={askDeleteProduct}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteProductModal
          productName={selectedProduct.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteProduct}
        />
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  main: {
    flex: 1,
    background: "#f8fafc",
  },
  topbar: {
    padding: "15px 25px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    padding: "8px 14px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  empty: {
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#475569",
    textAlign: "center",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    position: "relative",
    background: "#fff",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  deleteIcon: {
    position: "absolute",
    top: "8px",
    right: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "12px",
    color: "#475569",
    margin: "2px 0",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
  },
  publish: {
    flex: 1,
    padding: "6px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  unpublish: {
    flex: 1,
    padding: "6px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  edit: {
    flex: 1,
    padding: "6px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Products;
