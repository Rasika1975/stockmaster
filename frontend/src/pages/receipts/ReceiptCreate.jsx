import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../../components/Card.jsx';
import Input from '../../components/Input.jsx';
import Select from '../../components/Select.jsx';
import Button from '../../components/Button.jsx';

const ReceiptCreate = ({ data, onAddReceipt }) => {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([{ productId: '', quantity: 1 }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplier || !warehouse || items.some(item => !item.productId || item.quantity <= 0)) {
      alert('Please fill in all fields and ensure item quantities are positive.');
      return;
    }

    const newReceipt = {
      id: Date.now(),
      receiptNo: `REC-${String(Date.now()).slice(-5)}`,
      supplier,
      warehouse,
      date,
      status: 'Pending', // Receipts start as Pending
      items: items.map(item => {
        const product = data.products.find(p => p.id === parseInt(item.productId));
        return {
          product: product?.name || 'Unknown Product',
          quantity: Number(item.quantity),
          received: 0,
        };
      }),
    };

    if (onAddReceipt) {
      onAddReceipt(newReceipt);
    }
    navigate('/receipts');
  };

  const productOptions = [{ label: 'Select a product', value: '' }, ...data.products.map(p => ({ label: `${p.name} (SKU: ${p.sku})`, value: p.id }))];
  const warehouseOptions = [{ label: 'Select a warehouse', value: '' }, ...data.warehouses.map(w => ({ label: w.name, value: w.name }))];

  return (
    <Card title="Create New Receipt">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Supplier" name="supplier" value={supplier} onChange={e => setSupplier(e.target.value)} required />
          <Select label="Warehouse" name="warehouse" options={warehouseOptions} value={warehouse} onChange={e => setWarehouse(e.target.value)} />
          <Input label="Date" name="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Select name="productId" options={productOptions} value={item.productId} onChange={e => handleItemChange(index, 'productId', e.target.value)} />
                </div>
                <div className="w-32">
                  <Input name="quantity" type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} />
                </div>
                <Button type="button" variant="danger" size="sm" icon={<Trash2 size={16} />} onClick={() => handleRemoveItem(index)} />
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" icon={<Plus size={16} />} onClick={handleAddItem} className="mt-4">
            Add Item
          </Button>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={() => navigate('/receipts')}>Cancel</Button>
          <Button type="submit">Save Receipt</Button>
        </div>
      </form>
    </Card>
  );
};

export default ReceiptCreate;