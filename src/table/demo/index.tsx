import * as React from 'react';
import {Table} from 'envd';

const TableDemo: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌1',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖2',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦祖3',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖4',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '5',
      name: '胡彦祖5',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Table
      scroll={{y: 200}}
      autoScroll
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default TableDemo;
