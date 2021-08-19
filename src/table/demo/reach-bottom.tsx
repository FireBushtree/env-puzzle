/* eslint-disable require-jsdoc */
import * as React from 'react';
import {Table} from 'env-puzzle';
import {Button} from 'antd';

// @ts-ignore
import {TableControl} from '../table';

class User {
  key: number;
  name: string;
  age: number;
  address: string;
  constructor(key: number) {
    this.key = key;
    this.name = `葡萄${key}`;
    this.age = Math.floor(20 + Math.random() * 5);
    this.address = `西湖区湖底公园${key}号`;
  }
}

const requestUser = (page) => {
  return new Promise<Array<User>>((resolve) => {
    setTimeout(() => {
      const users = [];
      const initPage = 5 * page;
      for (let i = initPage; i < initPage + 5; i++) {
        users.push(new User(i));
      }

      resolve(users);
    }, 1500);
  });
};

const TableDemo: React.FC = () => {
  let [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<Array<User>>([]);
  const tableRef = React.useRef<TableControl>();

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

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await requestUser(page);
      setLoading(false);
      setDataSource([...dataSource, ...res]);
    })();
  }, [page]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          tableRef.current.scrollToTop();
        }}
      >
        回到顶部
      </Button>
      <Table
        ref={tableRef}
        loading={loading}
        scroll={{y: 200}}
        columns={columns}
        dataSource={dataSource}
        onReachBottom={(e) => {
          setPage(++page);
        }}
      />
    </>
  );
};

export default TableDemo;
