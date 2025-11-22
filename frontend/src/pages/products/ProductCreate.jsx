import { useState } from "react";
import Input from "../../components/Input.jsx";
import Select from "../../components/Select.jsx";
import Button from "../../components/Button.jsx";
import { dummyData } from "../../data/dummyData.js";
import { productsAPI } from "../../services/api";

const ProductCreate = ({ onProductCreated, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unit: "",
    reorderLevel: 0,
    initialStock: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const productData = {
        ...form,
        stock: Number(form.initialStock),
        reorderLevel: Number(form.reorderLevel),
        locations: {},
      };
      
      const newProduct = await productsAPI.create(productData);
      
      if (onProductCreated) {
        onProductCreated(newProduct);
        if (onCancel) onCancel(); // This ensures the modal closes after creation
      }
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <Input
        label="Product Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="SKU / Code"
        name="sku"
        value={form.sku}
        onChange={handleChange}
        required
      />
      <Select
        label="Category"
        name="category"
        options={[{ label: 'Select Category', value: '' }, ...dummyData.categories.map(c => ({ label: c.name, value: c.name }))]}
        value={form.category}
        onChange={handleChange}
      />
      <Input
        label="Unit of Measure"
        name="unit"
        value={form.unit}
        onChange={handleChange}
        placeholder="e.g., pcs, kg, box"
      />
      <Input
        label="Initial Stock"
        name="initialStock"
        type="number"
        value={form.initialStock}
        onChange={handleChange}
      />
      <Input
        label="Reorder Level"
        name="reorderLevel"
        type="number"
        value={form.reorderLevel}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductCreate;
