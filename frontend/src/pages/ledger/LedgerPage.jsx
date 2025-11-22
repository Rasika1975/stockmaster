import React from 'react';
import Card from '../../components/Card.jsx';
import Table from '../../components/Table.jsx';

const LedgerPage = ({ data }) => {
  const cols = [
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'product', label: 'Product' },
    { key: 'quantity', label: 'Qty', render: r => <span className={`${r.quantity > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>{r.quantity}</span> },
    { key: 'type', label: 'Type' },
    { key: 'from', label: 'From' },
    { key: 'to', label: 'To' },
    { key: 'reference', label: 'Ref' },
    { key: 'performedBy', label: 'By' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock Ledger</h2>
      <Card>
        <Table columns={cols} data={data.ledger} />
      </Card>
    </div>
  );
};

export default LedgerPage;
