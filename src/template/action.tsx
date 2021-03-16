import {
  CaretDownOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {Button, Checkbox, Menu, Modal, Popover} from 'antd';
import React, {useState} from 'react';
import {cloneDeep} from 'lodash';
import {TableColumnType} from './table';
import './icon-font/iconfont';
import Icon from './icon';
import ImportModal from '../import-modal';

export interface ActionProps<T> {
  onCreate?: () => any;
  onDelete?: (selectRows: Array<T>) => any;
  onExport?: () => any;
  uploadUrl?: string;
  templateSrc?: string;
  onImport?: () => any;
  createBtn?: boolean;
  deleteBtn?: boolean;
  importBtn?: boolean;
  exportBtn?: boolean;
  moreButtons?: Array<{
    icon?: React.ReactNode;
    name: string;
    onClick?: () => any;
  }>;
  columns: TableColumnType<T>;
  selectable?: boolean;
  selectRows?: Array<T>;
  setColumns: (columns: TableColumnType<T>) => any;
}

function Action<T extends object = any>(props: ActionProps<T>) {
  const {
    columns,
    createBtn,
    deleteBtn,
    importBtn,
    exportBtn,
    setColumns,
    onCreate,
    onDelete,
    uploadUrl,
    templateSrc,
    moreButtons,
    // TODO: add event
    // onExport,
    onImport,
    selectable,
    selectRows,
  } = props;

  const [showImport, setShowImport] = useState(true);

  const talbeColumnMenus = (
    <Menu>
      {columns.map((item, index) => (
        <Menu.Item key={index}>
          <Checkbox
            onChange={(e) => {
              const newColumns = cloneDeep(columns);
              newColumns[index].isShow = e.target.checked;
              setColumns(newColumns);
            }}
            checked={item.isShow}
          >
            {item.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const exportMenus = (
    <Menu>
      <Menu.Item key="rows">导出选中行</Menu.Item>
      <Menu.Item key="page">导出当前页</Menu.Item>
      <Menu.Item key="all">导出全部</Menu.Item>
    </Menu>
  );

  const moreButtonList = (
    <Menu className="env-template-action-more-button-list">
      {importBtn && (
        <Menu.Item
          onClick={() => {
            setShowImport(true);
          }}
          key="import"
        >
          <div className="env-template-action-more-button-item">
            <Icon name="icon-daoru" />
            <span>导入</span>
          </div>
        </Menu.Item>
      )}
      {moreButtons?.length > 0 &&
        moreButtons.map((item, index) => (
          <Menu.Item
            onClick={() => {
              item.onClick && item.onClick();
            }}
            key={index}
          >
            <div className="env-template-action-more-button-item">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <div className="env-template-action">
      <div className="env-template-action-left">
        {createBtn && (
          <Button
            onClick={() => {
              onCreate && onCreate();
            }}
            type="primary"
            icon={<PlusOutlined />}
          >
            新建
          </Button>
        )}
        {deleteBtn && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: `确定删除选中的${selectRows.length}条数据吗？`,
                icon: <ExclamationCircleOutlined />,
                onOk: () => {
                  return onDelete && onDelete(selectRows);
                },
                onCancel: () => {
                  // nothing todo
                },
              });
            }}
            type="primary"
            icon={<DeleteOutlined />}
            danger
            disabled={selectable && selectRows.length === 0}
          >
            删除
          </Button>
        )}

        {(importBtn || moreButtons?.length > 0) && (
          <Popover
            overlayClassName="env-template-action-popover"
            content={moreButtonList}
          >
            <Button
              className="env-template-action-btn__more"
              icon={<MenuOutlined />}
              type="primary"
            >
              更多
            </Button>
          </Popover>
        )}
      </div>

      <div className="env-template-action-right">
        <Popover
          overlayClassName="env-template-action-popover"
          title="隐藏显示列"
          content={talbeColumnMenus}
        >
          <Button className="env-template-action-btn__table">
            <Icon name="icon-ai238" />
            <CaretDownOutlined />
          </Button>
        </Popover>

        {exportBtn && (
          <Popover
            overlayClassName="env-template-action-popover"
            content={exportMenus}
          >
            <Button className="env-template-action-btn__export">
              <Icon name="icon-daochu" />
              <CaretDownOutlined />
            </Button>
          </Popover>
        )}
      </div>

      <ImportModal
        onOk={() => {
          onImport && onImport();
        }}
        uploadUrl={uploadUrl}
        templateSrc={templateSrc}
        visible={showImport}
        onCancel={() => setShowImport(false)}
      />
    </div>
  );
}

Action.defaultProps = {
  createBtn: true,
  deleteBtn: true,
  importBtn: true,
  exportBtn: true,
};

export default Action;
