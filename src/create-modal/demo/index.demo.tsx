import React, {useState} from 'react';
import {CreateModal} from 'env-puzzle';
import {Button, Input, InputNumber, Select} from 'antd';

const CreateModalDemo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setShowCreate(true)}>
        新建
      </Button>
      <CreateModal
        title="新建"
        visible={showCreate}
        onSave={(fields) => {
          console.log(fields);
        }}
        onCancel={() => setShowCreate(false)}
      >
        <div data-title="基本信息" />
        <Input data-required data-label="姓名" data-name="username" />

        <Select data-required data-label="年龄" data-name="age">
          {new Array(10).fill({}).map((item, index) => (
            <Select.Option key={index} value={index}>
              {index}
            </Select.Option>
          ))}
        </Select>

        <InputNumber data-required data-label="学号" data-name="studentId" />

        <InputNumber data-required data-label="班级" data-name="classNum" />

        <Input.TextArea data-span={24} data-label="备注" data-name="marker" />
      </CreateModal>
    </>
  );
};

export default CreateModalDemo;
