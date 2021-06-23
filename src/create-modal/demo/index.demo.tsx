import React, {useRef, useState} from 'react';
import {CreateModal, ToMap} from 'env-puzzle';
import {Button, Col, DatePicker, Input, InputNumber, Row, Select} from 'antd';
import {ToMapControl} from 'lib/to-map/to-map';
import {CreateModalControl} from 'lib/create-modal';

const CreateModalDemo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);

  const toMapRef = useRef<ToMapControl>(null);
  const createModalRef = useRef<CreateModalControl>(null);
  const {setFieldsValue} = createModalRef.current?.form || {};

  return (
    <>
      <Button type="primary" onClick={() => setShowCreate(true)}>
        新建
      </Button>
      <CreateModal
        ref={createModalRef}
        title="新建"
        visible={showCreate}
        onSave={(fields) => {
          console.log(fields);
        }}
        onCancel={() => setShowCreate(false)}
        extraFooter={[
          <Button key="unbind" danger>
            解绑
          </Button>,
        ]}
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

        <DatePicker data-required data-label="生日" data-name="birthday" />

        <Input.TextArea data-span={24} data-label="备注" data-name="marker" />

        <Col span={12}>
          <Row>
            <Col span={16}>
              <Input
                data-span={24}
                data-required
                data-label="经度"
                data-name="longitudeDone"
                disabled
              />
            </Col>
            <Col offset={2} span={6}>
              <ToMap
                ref={toMapRef}
                onOk={(value) => {
                  toMapRef.current?.map.geocoder(value, (res: any) => {
                    setFieldsValue
                      && setFieldsValue({
                        longitudeDone: value.lng,
                        latitudeDone: value.lat,
                        address: res.address,
                      });
                  });
                }}
              />
            </Col>
          </Row>
        </Col>

        <Input
          disabled
          data-required
          data-label="纬度"
          data-name="latitudeDone"
        />
        <Input data-required data-label="地址" data-name="address" />
      </CreateModal>
    </>
  );
};

export default CreateModalDemo;
