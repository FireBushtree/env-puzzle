import React, {useState} from 'react';
import {Template, CreateModal} from 'env-puzzle';
import {Input} from 'antd';

const TemplateDemo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Template<any, {id: string; area: string}>
      tableProps={{
        selectable: true,
        columns: [
          {
            title: '地图',
            key: 'area',
            dataIndex: 'area',
          },
        ],
      }}
      actionProps={{
        onCreate: () => setShowCreate(true),
      }}
      getDataSource={(pagination, filter) => {
        return new Promise((resolve, reject) => {
          resolve({
            total: 100,
            rows: [
              {
                id: '123',
                area: '123',
              },
            ],
          });
        });
      }}
    >
      <Input data-name="name" data-label="姓名" />
      <Input data-name="gender" data-label="性别" />
      <Input data-name="classNum" data-label="班级" />
      <Input data-name="studentId" data-label="学号" />

      <CreateModal
        title="新建"
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onSave={(fields) => {
          console.log(fields);
        }}
      >
        <Input data-required data-label="姓名" data-name="name" />
      </CreateModal>
    </Template>
  );
};

export default TemplateDemo;
