import {Button, Col, Row, Tooltip} from 'antd';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import classnames from 'classnames';
import {UpOutlined} from '@ant-design/icons';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib/form';

export interface FilterProps {
  onSearch: () => any;
  onReset: () => any;
  children: React.ReactNode;
}

export interface FilterControl {
  form: FormInstance;
}

const Filter: React.ForwardRefRenderFunction<FilterControl, FilterProps> = (
    props,
    ref,
) => {
  const {onSearch, onReset} = props;

  const [form] = Form.useForm();
  const [isFold, setIsFold] = useState(true);
  const {children} = props;
  const childArray = React.Children.toArray(children);
  // 只有当多于两个搜索条件时才展示['展开', '收起']
  const hasUnFoldButton = childArray.length > 2;

  const actionOffset = isFold ?
    childArray.length === 1 ?
      8 :
      0 :
    16 - (childArray.length % 3) * 8;

  useImperativeHandle(ref, () => ({
    form,
  }));

  return (
    <Form form={form} className="env-template-filter">
      <Row gutter={80}>
        {childArray.map((item, index) => {
          const labelText = (item as React.ReactElement).props['data-label'];
          const name = (item as React.ReactElement).props['data-name'];

          return (
            <Col
              className={classnames('env-template-filter-col', {
                ['is-hide']: isFold && index > 1,
              })}
              span={8}
              key={index}
            >
              <Form.Item
                name={name}
                className="env-template-filter-form-item"
                label={
                  <Tooltip placement="right" title={labelText}>
                    <div className="env-template-filter-col-label">
                      {labelText}
                    </div>
                  </Tooltip>
                }
              >
                {childArray[index]}
              </Form.Item>
            </Col>
          );
        })}

        {childArray.length > 0 ? (
          <Col
            offset={actionOffset}
            span={8}
            className="env-template-filter-actions"
          >
            <Button type="primary" onClick={() => onSearch()}>
              查询
            </Button>
            <Button onClick={() => onReset()}>重置</Button>

            {hasUnFoldButton && (
              <Button
                onClick={() => {
                  setIsFold(!isFold);
                }}
                className="env-template-filter-btn-pack"
                type="link"
              >
                <UpOutlined
                  className={classnames('env-template-filter-btn-fold', {
                    ['is-fold']: isFold,
                  })}
                />
                {isFold ? '收起' : '展开'}
              </Button>
            )}
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default forwardRef(Filter);
