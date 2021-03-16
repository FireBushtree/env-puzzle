import {Button, message, Modal, Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import {ModalProps as AntdModalProps} from 'antd/lib/modal';
import classnames from 'classnames';
import {UploadOutlined} from '@ant-design/icons';
import {UploadFile} from 'antd/lib/upload/interface';
import RequestUtil from '../utils/RequestUtil';

export interface ImportModalProps extends AntdModalProps {
  uploadUrl: string;
  templateSrc: string;
  onOk: () => any;
}

const ImportModal: React.FC<ImportModalProps> = (props) => {
  const {
    visible,
    className,
    uploadUrl,
    templateSrc,
    onOk,
    onCancel,
    ...rest
  } = props;

  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (fileList.length === 0) {
      message.warning('请上传文件');
      return;
    }

    const formData = new FormData();
    fileList.forEach((item) => {
      formData.append('file', item.originFileObj);
    });

    try {
      setLoading(true);

      await RequestUtil.uploadFile(uploadUrl, formData);
      message.success('操作成功');
      onOk && onOk();
    } catch (error) {
      message.error(error.msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      setFileList([]);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      className={classnames('env-import-modal', className)}
      width={600}
      title="导入"
      onCancel={onCancel}
      footer={[
        <Button disabled={loading} key="clear" onClick={() => setFileList([])}>
          清空
        </Button>,
        <Button
          loading={loading}
          key="import"
          type="primary"
          onClick={handleOk}
        >
          导入
        </Button>,
      ]}
      {...rest}
    >
      <div className="env-import-modal-download-wrap">
        <Button type="primary">下载模板</Button>
      </div>
      <div className="env-import-modal-body">
        <Upload
          beforeUpload={() => false}
          fileList={fileList}
          maxCount={1}
          onChange={({fileList}) => {
            setFileList(fileList);
          }}
        >
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default ImportModal;
