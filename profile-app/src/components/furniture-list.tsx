import { useEffect, useState } from "react";
import "../App.css";
import type { Furniture } from "../models/Furniture";
import { fetchAll, createFurniture, deleteFurniture } from "../api/api-furniture";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import FurnitureModal from "./furniture-modal";

export default function FurnitureList() {
  const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Furniture | null>(null);

  useEffect(() => {
    fetchAll()
      .then((data) => setFurniture(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleAddFurniture = async (item: Omit<Furniture, "id">) => {
    try {
      const created = await createFurniture(item);
      setFurniture((prev) => [...prev, created]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add furniture");
    }
  };

  const handleRowClick = (item: Furniture) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await deleteFurniture(selectedItem.id);
      setFurniture((prev) => prev.filter((f) => f.id !== selectedItem.id));
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete furniture");
    }
  };

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading furniture...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="app">
      <div className="top-buttons">
        <button className="profile-button" onClick={goToProfile}>
          Profile
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <h1>Furniture List</h1>
      <button className="add-button" onClick={() => setShowModal(true)}>
        Add Furniture
      </button>

      {furniture.length === 0 ? (
        <p>No furniture to display</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
              {furniture.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="clickable-row"
                >
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price} PLN</td>
                  <td style={{ textAlign: "center" }}>
                    {item.inStock ? <span>✓</span> : <span>×</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FurnitureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddFurniture}
      />

      {showDeleteModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Delete Furniture</h2>
            <p>
              Are you sure you want to delete <strong>{selectedItem.name}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="save-button" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
