import React, {useRef, useState} from 'react';
import {Template, CreateModal, ViewModal} from 'env-puzzle';
import {DatePicker, Input, message} from 'antd';
import moment from 'moment';

// @ts-ignore
import {CreateModalControl} from 'env-puzzle/lib/create-modal';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import {mockRows} from './mockRows';

export interface Student {
  id: number;
  name: string;
  gender: string;
  classNum: string;
  studentId: string;
}

const {Card} = Template;

const TemplateDemo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const createModalRef = useRef<CreateModalControl>();
  const [currentStudent, setCurrentStudent] = useState<Student>();
  const [isDog, setIsDog] = useState(false);

  const renderCard = (item: Student) => (
    <Card
      title={item.name}
      renderButtons={[
        {name: '查看'},
        {name: '删除'},
        {name: '编辑'},
        {name: '派发'},
      ]}
    >
      <Card.Field label="常住户数/开卡数">1000 / 897</Card.Field>
      <Card.Field label="分类类型">省级高标准</Card.Field>
      <Card.Field label="运营单位">浙江我很帅公司</Card.Field>
      <Card.Field label="投放点数">20</Card.Field>
      <Card.Field label="智能设备数量">40</Card.Field>
    </Card>
  );

  return (
    <>
      <Template<any, Student>
        tableProps={{
          renderCard,
          theme: 'card',
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
                {
                  name: '删除',
                  onClick: () =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        resolve(1);
                        message.success('删除成功');
                      }, 2000);
                    }),
                },
              ],
            },
          ],
        }}
        actionProps={{
          moreButtons: [{name: '绑定信息', onClick: () => {}}],
          onCreate: () => setShowCreate(true),
          onDelete: (rows) => {
            console.log(rows);
          },
          templateSrc: '/template/监测项信息导入.xls',
          uploadUrl: '/cloud/tjdx/prd/web/api/trashFeatureIndicator/import',
        }}
        getDataSource={(pagination, filter) => {
          return new Promise((resolve, reject) => {
            resolve({
              total: 100,
              rows: mockRows,
            });
          });
        }}
      >
        <Input data-name="name" data-label="姓名" />
        <Input data-name="gender" data-label="性别" />
        <Input data-name="classNum" data-label="班级" />
        <DatePicker.RangePicker
          data-init-value={[moment().startOf('month'), moment()]}
          data-name="test"
          data-label="起始时间"
        />
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
        <Checkbox
          onChange={(e) => {
            setIsDog(e.target.checked);
          }}
          data-required
          data-label="单身"
          data-name="dog"
        />
        {isDog && <Input data-label="心动女生" data-name="girl" />}
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
