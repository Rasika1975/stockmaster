import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';

const AdjustmentsPage = ({ data }) => {
  const cols = [
    { key: 'adjustmentNo', label: 'Adjustment #' },
    { key: 'product', label: 'Product' },
    { key: 'warehouse', label: 'Warehouse' },
    { key: 'systemQty', label: 'System Qty' },
    { key: 'countedQty', label: 'Counted' },
    { key: 'difference', label: 'Diff' },
    { key: 'reason', label: 'Reason' }
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock Adjustments</h2>
      <Card>
        <Table columns={cols} data={data.adjustments} />
      </Card>
    </div>
  );
};

export default AdjustmentsPage;
