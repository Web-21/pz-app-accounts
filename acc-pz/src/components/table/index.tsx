import React from 'react';
import { Table } from 'antd';


export const DataTable = ( {columns, data, loading} ) => {

  return <Table columns={columns} dataSource={data} loading={loading} />;
};
