import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card.jsx';
import Badge from '../../components/Badge.jsx';
import { dummyData } from '../../data/dummyData.js';

const ProductDetail = ({ product: propProduct }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(propProduct);

  useEffect(() => {
    // If the component is used on a route, it fetches its own data.
    // If it's used in a modal, it receives data via props.
    if (id && !propProduct) {
      // In a real app, you'd fetch this from an API:
      // fetch(`/api/products/${id}`).then(...)
      const foundProduct = dummyData.products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, propProduct]);

  if (!product) {
    return (
      <Card>
        <p className="text-center text-gray-500">Product not found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku} | Category: {product.category}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500">Total Stock</p>
            <p className="text-3xl font-bold text-gray-800">{product.stock} <span className="text-lg font-normal">{product.unit}</span></p>
            <Badge variant={product.stock === 0 ? 'danger' : product.stock <= product.reorderLevel ? 'warning' : 'success'}>
              {product.stock === 0 ? 'Out of Stock' : product.stock <= product.reorderLevel ? 'Low Stock' : 'In Stock'}
            </Badge>
          </div>
        </div>
      </Card>

      <Card title="Stock by Location">
        <ul className="divide-y divide-gray-200">
          {Object.entries(product.locations).map(([locId, qty]) => {
            const warehouse = dummyData.warehouses.find(w => w.id === parseInt(locId));
            return (
              <li key={locId} className="py-3 flex justify-between items-center">
                <span className="text-gray-600">{warehouse?.name || `Location ID: ${locId}`}</span>
                <span className="font-bold text-gray-800">{qty} {product.unit}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default ProductDetail;
