import {Modal, Form, Row, Button, message} from 'antd';
import {FormInstance} from 'antd/lib/form';
import {ModalProps as AntdModalProps} from 'antd/lib/modal';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {renderFieldItem} from './function';

export interface CreateModalProps extends AntdModalProps {
  onSave?: (formData: any) => any;
  onReset?: () => any;
  children?: React.ReactNode;
  extraFooter?: Array<React.ReactNode>;
}

export interface CreateModalControl {
  form: FormInstance;
}

const CreateModal: React.ForwardRefRenderFunction<
  CreateModalControl,
  CreateModalProps
> = (props, ref) => {
  const {children, visible, onSave, onReset, extraFooter = [], ...rest} = props;
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

    return childArray.map((item, index) => renderFieldItem(item, index));
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
        ...extraFooter,
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
