import React from "react";
import type { Furniture } from "../models/Furniture";

interface FurnitureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<Furniture, "id">) => void;
  initialItem?: Furniture;
}

export default function FurnitureModal({
  isOpen,
  onClose,
  onSave,
  initialItem,
}: FurnitureModalProps) {
  const [item, setItem] = React.useState<Furniture>(
    initialItem || { id: 0, name: "", category: "", price: 0, inStock: false }
  );

  React.useEffect(() => {
    if (initialItem) setItem(initialItem);
  }, [initialItem]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: item.name,
      category: item.category,
      price: item.price,
      inStock: item.inStock,
    });
    setItem({ id: 0, name: "", category: "", price: 0, inStock: false });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialItem ? "Edit Furniture" : "Add New Furniture"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              setItem({ ...item, price: parseFloat(e.target.value) })
            }
            required
          />
          <div className="checkbox-container">
            <input
              id="inStock"
              type="checkbox"
              checked={item.inStock}
              onChange={(e) => setItem({ ...item, inStock: e.target.checked })}
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
