import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';

const TransfersPage = ({ data }) => {
  const cols = [
    { key: 'transferNo', label: 'Transfer #' },
    { key: 'fromWarehouse', label: 'From' },
    { key: 'toWarehouse', label: 'To' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' }
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Internal Transfers</h2>
      <Card>
        <Table columns={cols} data={data.transfers} />
      </Card>
    </div>
  );
};

export default TransfersPage;
