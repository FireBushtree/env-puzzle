import {Button, Modal, Upload} from 'antd';
import React from 'react';
import {ModalProps as AntdModalProps} from 'antd/lib/modal';
import classnames from 'classnames';
import {UploadOutlined} from '@ant-design/icons';

export interface ImportModalProps extends AntdModalProps {}

const ImportModal: React.FC<ImportModalProps> = (props) => {
  const {visible, className, ...rest} = props;

  return (
    <Modal
      visible={visible}
      className={classnames('env-import-modal', className)}
      width={600}
      title="导入"
      {...rest}
    >
      <div className="env-import-modal-download-wrap">
        <Button type="primary">下载模板</Button>
      </div>
      <div className="env-import-modal-body">
        <Upload>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default ImportModal;
