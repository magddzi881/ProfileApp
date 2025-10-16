import { useEffect, useState } from "react";
import "../App.css";
import type { Furniture } from "../models/Furniture";
import { fetchAll } from "../api/api-furniture";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function FurnitureList() {
  const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading furniture...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="app">
      <div className="top-buttons">
        <button className="profile-button" onClick={goToProfile}>Profile</button>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>

      <h1>Furniture List</h1>

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
              <tr key={item.id}>
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
    </div>
  );
}
