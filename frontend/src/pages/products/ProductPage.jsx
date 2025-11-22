import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../../components/Card.jsx';
import Table from '../../components/Table.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/Modal.jsx';
import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';

const ProductsPage = ({ data, onAddProduct }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewProduct, setViewProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [products, setProducts] = useState(data.products);

  const filtered = data.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' ? true : p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    { key: 'name', label: 'Product', render: r => <div><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">SKU: {r.sku}</div></div> },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock', render: r => <span className={`${r.stock === 0 ? 'text-red-600' : r.stock <= r.reorderLevel ? 'text-yellow-600' : 'text-gray-800'} font-bold`}>{r.stock} {r.unit}</span> },
    { key: 'reorderLevel', label: 'Reorder' }
  ];

  const handleView = (row) => {
    setViewProduct(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row) => {
    // navigate to edit page or open modal
    alert('Edit not implemented in demo — go to /products/:id for full detail.');
  };

  const handleDelete = (row) => {
    if (confirm(`Delete ${row.name}?`)) {
      alert('Delete action would call API here.');
    }
  };

  const handleProductCreated = (newProduct) => {
    // Call the function passed from App.jsx to update the global state
    if (onAddProduct) onAddProduct(newProduct);
    setIsCreateModalOpen(false);
  };

  return (
    <Card
      title="Products"
      actions={
        <Button icon={<Plus size={20} />} onClick={() => setIsCreateModalOpen(true)}>Add Product</Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {data.categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          data={filtered}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title={`Product Details: ${viewProduct?.name || ''}`}>
        {viewProduct ? <ProductDetail product={viewProduct} /> : <p>Loading...</p>}
      </Modal>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Product">
        <ProductCreate onProductCreated={handleProductCreated} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>
    </Card>
  );
};

export default ProductsPage;
