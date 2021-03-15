import {
  CaretDownOutlined,
  DeleteOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {Button, Checkbox, Menu, Popover} from 'antd';
import React from 'react';
import {cloneDeep} from 'lodash';
import {TableColumnType} from './table';
import './icon-font/iconfont';
import Icon from './icon';

export interface ActionProps<T> {
  onCreate?: () => any;
  onDelete?: () => any;
  onExport?: () => any;
  onImport?: () => any;
  createBtn?: boolean;
  deleteBtn?: boolean;
  importBtn?: boolean;
  exportBtn?: boolean;
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
    // importBtn,
    exportBtn,
    setColumns,
    onCreate,
    onDelete,
    // TODO: add event
    // onExport,
    // onImport,
    selectable,
    selectRows,
  } = props;
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
              onDelete && onDelete();
            }}
            type="primary"
            icon={<DeleteOutlined />}
            danger
            disabled={selectable && selectRows.length === 0}
          >
            删除
          </Button>
        )}
        <Button
          className="env-template-action-btn__more"
          icon={<MenuOutlined />}
          type="primary"
        >
          更多
        </Button>
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
