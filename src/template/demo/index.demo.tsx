import React, {useRef, useState} from 'react';
import {Template, CreateModal, ViewModal} from 'env-puzzle';
import {Input} from 'antd';

// @ts-ignore
import {CreateModalControl} from 'env-puzzle/lib/create-modal';

export interface Student {
  name: string;
  gender: string;
  classNum: string;
  studentId: string;
}

const TemplateDemo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const createModalRef = useRef<CreateModalControl>();
  const [currentStudent, setCurrentStudent] = useState<Student>();

  return (
    <>
      <Template<any, Student>
        tableProps={{
          selectable: true,
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
            {
              title: '性别',
              dataIndex: 'gender',
            },
            {
              title: '班级',
              dataIndex: 'classNum',
            },
            {
              title: '学号',
              dataIndex: 'studentId',
            },
            {
              title: '操作',
              renderButtons: () => [
                {
                  name: '查看',
                  onClick: (text, record) => {
                    setShowView(true);
                    setCurrentStudent(record);
                  },
                },
                {
                  name: '编辑',
                  onClick: (text, record) => {
                    setShowCreate(true);
                    createModalRef.current.form.setFieldsValue(record);
                  },
                },
              ],
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
                  name: '小黑',
                  gender: '男',
                  classNum: '1',
                  studentId: '555',
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
      </Template>

      <CreateModal
        title="新建"
        ref={createModalRef}
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onSave={(fields) => {
          console.log(fields);
        }}
      >
        <Input data-required data-label="姓名" data-name="name" />
        <Input data-required data-label="性别" data-name="gender" />
        <Input data-required data-label="班级" data-name="classNum" />
        <Input data-required data-label="学号" data-name="studentId" />
      </CreateModal>

      <ViewModal
        title="查看"
        visible={showView}
        onCancel={() => setShowView(false)}
      >
        <div data-label="姓名">{currentStudent?.name}</div>
        <div data-label="性别">{currentStudent?.gender}</div>
        <div data-label="班级">{currentStudent?.classNum}</div>
        <div data-label="学号">{currentStudent?.studentId}</div>
      </ViewModal>
    </>
  );
};

export default TemplateDemo;
