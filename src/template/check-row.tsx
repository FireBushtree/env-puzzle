import React from 'react';
import classnames from 'classnames';
import {InfoCircleOutlined} from '@ant-design/icons';

export interface CheckRowProps<T> {
  selectedRows: T[];
  clearSelectedRows: () => any;
}
function CheckRow<T extends object = any>(props: CheckRowProps<T>) {
  const {selectedRows, clearSelectedRows} = props;

  return (
    <div
      className={classnames('env-template-check-row', {
        ['is-hide']: selectedRows.length === 0,
      })}
    >
      <InfoCircleOutlined className="env-template-check-row-blue" />
      <span className="env-template-check-row-value">
        已选择
        <span className="env-template-check-row-blue">
          {selectedRows.length}
        </span>
        项
      </span>
      <span
        onClick={() => {
          clearSelectedRows();
        }}
        className="env-template-check-row-clear env-template-check-row-blue"
      >
        清空
      </span>
    </div>
  );
}

export default CheckRow;
