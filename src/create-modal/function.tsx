import React from 'react';
import {Col, Input, Tooltip, Checkbox, InputNumber, Form} from 'antd';

export const renderFieldItem = (reactNode: React.ReactNode, index: number) => {
  if (
    reactNode === null
    || typeof reactNode === 'string'
    || typeof reactNode === 'boolean'
    || typeof reactNode === 'number'
  ) {
    return;
  }

  const {props, type} = reactNode as React.ReactElement;

  const isInput
    = type === Input || type === Input.TextArea || type === InputNumber;
  const tipMessagePrefix = isInput ? '请输入' : '请选择';

  // 标题组件用到的props
  const title = props['data-title'];

  // 没有 label 也没有 name, 视为默认元素
  if (title) {
    return (
      <Col key={title} span={24}>
        <div className="env-create-modal-title">{title}</div>
      </Col>
    );
  }

  // 表单组件用到的props
  const required = props['data-required'];
  const label = props['data-label'];
  const name = props['data-name'];
  const rules = props['data-rules'] || [];

  // 自定义列 默认为24
  // form列 默认为12
  const span = props['data-span'];

  // 不设置 `data-label` 和 `data-name` 则视为自定义字段
  if (!label && !name) {
    return (
      <Col key={index} className="env-create-modal-col" span={span || 24}>
        {reactNode}
      </Col>
    );
  }

  if (required) {
    rules.push({
      required: true,
      message: tipMessagePrefix + label,
    });
  }

  // 很多时候input会忘记设置最大长度的属性
  // 这里为input组件自动注入`maxlength`属性
  if (isInput) {
    const {maxLength} = props;
    if (!maxLength) {
      reactNode = React.cloneElement(reactNode as React.ReactElement, {
        maxLength: 100,
      });
    }
  }
  const valuePropName = type === Checkbox ? 'checked' : 'value';

  return (
    <Col key={index} span={span || 12}>
      <Form.Item
        valuePropName={valuePropName}
        label={<Tooltip title={label}>{label}</Tooltip>}
        name={name}
        rules={rules}
      >
        {reactNode}
      </Form.Item>
    </Col>
  );
};
