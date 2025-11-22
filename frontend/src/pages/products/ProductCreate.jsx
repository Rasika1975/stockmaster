import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card.jsx';
import Input from '../../components/Input.jsx';
import Select from '../../components/Select.jsx';
import Button from '../../components/Button.jsx';
import { dummyData } from '../../data/dummyData.js';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', sku: '', category: '', unit: '', reorderLevel: 0, initialStock: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: call API to create product. Here we just alert and navigate back.
    alert('Product created (demo). Connect to API to persist.');
    navigate('/products');
  };

  return (
    <Card title="Create Product">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Product Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <Input label="SKU / Code" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} required />
        <Select label="Category" options={[{label:'Select', value:''}, ...dummyData.categories.map(c=>({label:c.name, value:c.name}))]} value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <Input label="Unit of Measure" value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})} />
        <Input label="Reorder Level" type="number" value={form.reorderLevel} onChange={e=>setForm({...form, reorderLevel: Number(e.target.value)})} />
        <Input label="Initial Stock (optional)" type="number" value={form.initialStock} onChange={e=>setForm({...form, initialStock: Number(e.target.value)})} />
        <div className="md:col-span-2 flex gap-3 justify-end">
          <Button variant="outline" onClick={()=>navigate('/products')}>Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductCreate;
