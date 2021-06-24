import React from 'react';
import {Template} from 'env-puzzle';
import {Student} from './index.demo';
import {Input} from 'antd';
import {mockRows} from './mockRows';
const {Card} = Template;

const CardDemo: React.FC = (props) => {
  const renderCard = (item: Student) => (
    <Card
      title={item.name}
      subTitle="居民小区"
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
    <Template<any, Student>
      tableProps={{
        theme: 'card',
        renderCard,
        selectable: true,
      }}
      getDataSource={(pagination, filter) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              total: mockRows.length,
              rows: mockRows,
            });
          }, 1000);
        });
      }}
    >
      <Input data-name="name" data-label="姓名" />
      <Input data-name="gender" data-label="性别" />
      <Input data-name="classNum" data-label="班级" />
    </Template>
  );
};

export default CardDemo;
