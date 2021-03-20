import {
  Modal,
  Form,
  Col,
  Row,
  Input,
  Button,
  Tooltip,
  message,
  Checkbox,
  InputNumber,
} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {ModalProps as AntdModalProps} from 'antd/lib/modal';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';

export interface CreateModalProps extends AntdModalProps {
  onSave?: (formData: any) => any;
  onReset?: () => any;
  children?: React.ReactNode;
}

export interface CreateModalControl {
  form: FormInstance;
}

const CreateModal: React.ForwardRefRenderFunction<
  CreateModalControl,
  CreateModalProps
> = (props, ref) => {
  const {children, visible, onSave, onReset, ...rest} = props;
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [saving, setSaving] = useState(false);

  useImperativeHandle(ref, () => ({
    form,
  }));

  const renderFields = () => {
    const childArray: Array<React.ReactNode> = [];

    React.Children.forEach(children, (item) => {
      childArray.push(item);
    });

    return childArray.map((item, index) => {
      if (
        item === null
        || typeof item === 'string'
        || typeof item === 'boolean'
        || typeof item === 'number'
      ) {
        return;
      }

      const {props, type} = item as React.ReactElement;
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

      if (!label && !name) {
        return (
          <Col key={index} className="env-create-modal-col" span={span || 24}>
            {item}
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
          item = React.cloneElement(item as React.ReactElement, {
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
            {item}
          </Form.Item>
        </Col>
      );
    });
  };

  const handleSave = async () => {
    const res = await form.validateFields();

    try {
      setSaving(true);
      onSave && (await onSave(res));
    } catch (e) {
      message.error(e.data.msg);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    onReset && onReset();
  };

  React.useEffect(() => {
    // 关闭弹窗后， 清除错误， 清除数据
    if (!visible && formRef.current) {
      form.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      className="env-create-modal"
      visible={visible}
      width={900}
      footer={[
        <Button disabled={saving} key="clear" onClick={handleReset}>
          清空
        </Button>,
        <Button loading={saving} key="save" type="primary" onClick={handleSave}>
          保存
        </Button>,
      ]}
      {...rest}
    >
      <Form ref={formRef} form={form}>
        <Row gutter={60}>{renderFields()}</Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateModal);
