import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';

const DeliveriesPage = ({ data }) => {
  const cols = [
    { key: 'deliveryNo', label: 'Delivery #' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    { key: 'warehouse', label: 'Warehouse' },
    { key: 'status', label: 'Status' }
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Deliveries</h2>
      </div>
      <Card>
        <Table columns={cols} data={data.deliveries} />
      </Card>
    </div>
  );
};

export default DeliveriesPage;
