import React from 'react';
import {ModalProps as AntdModalProps} from 'antd/lib/modal';
import {Button, Col, Modal, Row, Tooltip} from 'antd';
import classnames from 'classnames';

export interface ViewModalProps extends AntdModalProps {}

const ViewModal: React.FC<ViewModalProps> = (props) => {
  const {visible, className, onCancel, children, ...rest} = props;

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    onCancel && onCancel(e);
  };

  const renderFields = () => {
    const childArray: Array<React.ReactNode> = [];

    React.Children.forEach(children, (item) => {
      childArray.push(item);
    });

    return childArray.map((item, index) => {
      if (
        item === null ||
        typeof item === 'string' ||
        typeof item === 'boolean' ||
        typeof item === 'number'
      ) {
        return;
      }

      const {props} = item as React.ReactElement;
      const title = props['data-title'];

      if (title) {
        return (
          <Col key={title} span={24}>
            <div className="env-view-modal-title">{title}</div>
          </Col>
        );
      }

      const label = props['data-label'];

      // 自定义列 默认为24
      // form列 默认为12
      const span = props['data-span'];

      return (
        <Col className="env-view-modal-col" key={label} span={span || 12}>
          <Tooltip title={label}>
            <span className="env-view-modal-col-label">{label}</span>
          </Tooltip>
          :<span className="env-view-modal-col-value">{item}</span>
        </Col>
      );
    });
  };

  return (
    <Modal
      className={classnames('env-view-modal', className)}
      visible={visible}
      width={900}
      onCancel={handleCancel}
      footer={[
        <Button key="confirm" type="primary" onClick={handleCancel}>
          确定
        </Button>,
      ]}
      {...rest}
    >
      <Row gutter={60}>{renderFields()}</Row>
    </Modal>
  );
};

export default ViewModal;
