// export the same dummyData you pasted earlier
export const dummyData = {
  warehouses: [
    { id: 1, name: 'Main Warehouse', address: 'Mumbai, Maharashtra', capacity: 10000, currentStock: 7500 },
    { id: 2, name: 'North Warehouse', address: 'Delhi, Delhi', capacity: 5000, currentStock: 3200 },
    { id: 3, name: 'South Warehouse', address: 'Bangalore, Karnataka', capacity: 7500, currentStock: 5100 }
  ],
  categories: [
    { id: 1, name: 'Electronics', productCount: 25 },
    { id: 2, name: 'Clothing', productCount: 40 },
    { id: 3, name: 'Food & Beverages', productCount: 15 },
    { id: 4, name: 'Furniture', productCount: 12 },
    { id: 5, name: 'Stationery', productCount: 30 }
  ],
  products: [
    { id: 1, name: 'Laptop HP Pavilion', sku: 'ELEC-001', category: 'Electronics', unit: 'Piece', reorderLevel: 10, stock: 45, locations: { 1: 25, 2: 15, 3: 5 } },
    { id: 2, name: 'T-Shirt Blue Cotton', sku: 'CLO-001', category: 'Clothing', unit: 'Piece', reorderLevel: 50, stock: 20, locations: { 1: 10, 2: 5, 3: 5 } },
    { id: 3, name: 'Coffee Beans Premium', sku: 'FOOD-001', category: 'Food & Beverages', unit: 'Kg', reorderLevel: 100, stock: 150, locations: { 1: 80, 2: 40, 3: 30 } },
    { id: 4, name: 'Office Chair Ergonomic', sku: 'FUR-001', category: 'Furniture', unit: 'Piece', reorderLevel: 15, stock: 8, locations: { 1: 5, 2: 2, 3: 1 } },
    { id: 5, name: 'Notebook A4 100 Pages', sku: 'STAT-001', category: 'Stationery', unit: 'Pack', reorderLevel: 200, stock: 0, locations: { 1: 0, 2: 0, 3: 0 } },
    { id: 6, name: 'Wireless Mouse', sku: 'ELEC-002', category: 'Electronics', unit: 'Piece', reorderLevel: 30, stock: 15, locations: { 1: 8, 2: 4, 3: 3 } }
  ],
  receipts: [
    { id: 1, receiptNo: 'REC-001', supplier: 'Tech Supplies Ltd', date: '2025-01-15', status: 'Done', warehouse: 'Main Warehouse', items: [{ product: 'Laptop HP Pavilion', quantity: 20, received: 20 }] },
    { id: 2, receiptNo: 'REC-002', supplier: 'Fashion Hub', date: '2025-01-18', status: 'Draft', warehouse: 'North Warehouse', items: [{ product: 'T-Shirt Blue Cotton', quantity: 50, received: 0 }] },
    { id: 3, receiptNo: 'REC-003', supplier: 'Bean Suppliers Co', date: '2025-01-20', status: 'Pending', warehouse: 'South Warehouse', items: [{ product: 'Coffee Beans Premium', quantity: 100, received: 50 }] }
  ],
  deliveries: [
    { id: 1, deliveryNo: 'DEL-001', customer: 'ABC Corp', date: '2025-01-16', status: 'Done', warehouse: 'Main Warehouse', items: [{ product: 'Laptop HP Pavilion', quantity: 5 }] },
    { id: 2, deliveryNo: 'DEL-002', customer: 'XYZ Ltd', date: '2025-01-19', status: 'Draft', warehouse: 'South Warehouse', items: [{ product: 'Coffee Beans Premium', quantity: 30 }] },
    { id: 3, deliveryNo: 'DEL-003', customer: 'Tech Solutions', date: '2025-01-21', status: 'Pending', warehouse: 'Main Warehouse', items: [{ product: 'Wireless Mouse', quantity: 10 }] }
  ],
  transfers: [
    { id: 1, transferNo: 'TRF-001', fromWarehouse: 'Main Warehouse', toWarehouse: 'North Warehouse', date: '2025-01-17', status: 'Done', items: [{ product: 'Laptop HP Pavilion', quantity: 10 }], reason: 'Stock balancing' },
    { id: 2, transferNo: 'TRF-002', fromWarehouse: 'South Warehouse', toWarehouse: 'Main Warehouse', date: '2025-01-19', status: 'Pending', items: [{ product: 'Coffee Beans Premium', quantity: 20 }], reason: 'Fulfillment requirement' }
  ],
  adjustments: [
    { id: 1, adjustmentNo: 'ADJ-001', product: 'Office Chair Ergonomic', warehouse: 'Main Warehouse', systemQty: 10, countedQty: 8, difference: -2, reason: 'Damaged', date: '2025-01-14', performedBy: 'Admin User' },
    { id: 2, adjustmentNo: 'ADJ-002', product: 'Wireless Mouse', warehouse: 'North Warehouse', systemQty: 5, countedQty: 7, difference: 2, reason: 'Found in secondary location', date: '2025-01-16', performedBy: 'Manager' }
  ],
  ledger: [
    { id: 1, date: '2025-01-15', time: '10:30 AM', product: 'Laptop HP Pavilion', quantity: 20, type: 'Receipt', from: 'Tech Supplies Ltd', to: 'Main Warehouse', reference: 'REC-001', performedBy: 'Admin User' },
    { id: 2, date: '2025-01-16', time: '02:15 PM', product: 'Laptop HP Pavilion', quantity: -5, type: 'Delivery', from: 'Main Warehouse', to: 'ABC Corp', reference: 'DEL-001', performedBy: 'Staff User' },
    { id: 3, date: '2025-01-17', time: '11:00 AM', product: 'Laptop HP Pavilion', quantity: -10, type: 'Transfer', from: 'Main Warehouse', to: 'North Warehouse', reference: 'TRF-001', performedBy: 'Manager' },
    { id: 4, date: '2025-01-18', time: '09:45 AM', product: 'Coffee Beans Premium', quantity: 100, type: 'Receipt', from: 'Bean Suppliers Co', to: 'Main Warehouse', reference: 'REC-003', performedBy: 'Admin User' },
    { id: 5, date: '2025-01-14', time: '03:30 PM', product: 'Office Chair Ergonomic', quantity: -2, type: 'Adjustment', from: 'Main Warehouse', to: '-', reference: 'ADJ-001', performedBy: 'Admin User' }
  ]
};
