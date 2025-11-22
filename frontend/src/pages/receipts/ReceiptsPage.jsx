import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { Link } from "react-router-dom";

const ReceiptsPage = ({ data }) => {
  const columns = [
    { key: 'receiptNo', label: 'Receipt #' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'date', label: 'Date' },
    { key: 'warehouse', label: 'Warehouse' },
    { key: 'status', label: 'Status', render: r => <span className="font-medium">{r.status}</span> }
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Receipts</h2>
        <Link to="/receipts/create"><Button>Add Receipt</Button></Link>
      </div>
      <Card>
        <Table columns={columns} data={data.receipts} />
      </Card>
    </div>
  );
};

export default ReceiptsPage;
