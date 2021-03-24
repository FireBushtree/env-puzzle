import React, {useState} from 'react';
import {ImportModal} from 'env-puzzle';
import {Button} from 'antd';

const ImportModalDemo: React.FC = (props) => {
  const [showImport, setShowImport] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setShowImport(true);
        }}
        type="primary"
      >
        导入
      </Button>
      <ImportModal
        // 基于umi的脚手架， 一般导入模板都放在public文件夹里面
        templateSrc="/template/监测项信息导入.xls"
        uploadUrl="导入地址"
        onOk={() => {
          // refreshPage()
        }}
        visible={showImport}
        onCancel={() => setShowImport(false)}
      />
    </>
  );
};

export default ImportModalDemo;
