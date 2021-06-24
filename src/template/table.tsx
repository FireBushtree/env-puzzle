import * as React from 'react';
import {useSize} from 'ahooks';
import classnames from 'classnames';
import {Table as AntTable, Pagination, Modal, Empty, Spin} from 'antd';
import {
  TablePaginationConfig,
  TableProps as AntTableProps,
  ColumnGroupType,
  ColumnType,
} from 'antd/lib/table';
import {Button, Popover, List} from 'antd';
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {TemplateTheme} from './template';
import {IsCardTheme} from './interface';

export interface ActionButton<T> {
  name: string;
  onClick?: (text: string, record: T, index: number) => any;
}

export interface CardActionButton<T> {
  name: string;
  onClick?: (record: T, index?: number) => any;
}

export type RenderCardButtons<T> =
  | CardActionButton<T>
  | Array<CardActionButton<T>>
  | ((row: T) => CardActionButton<T> | Array<CardActionButton<T>>);

export type RenderButtons<T> =
  | ActionButton<T>
  | Array<ActionButton<T>>
  | ((row: T) => ActionButton<T> | Array<ActionButton<T>>);

export type TableColumnType<T> = ((ColumnGroupType<T> | ColumnType<T>) & {
  isShow?: boolean;
  renderButtons?: RenderButtons<T>;
})[];

export interface TableProps<T>
  extends Omit<AntTableProps<T>, 'columns'>,
    IsCardTheme {
  hasIndex?: boolean;
  selectable?: boolean;
  columns?: TableColumnType<T>;
  theme?: TemplateTheme;
  renderCard?: (data: T, index: number) => JSX.Element;
}

function handleActionButtonClick<T>(
  button: ActionButton<T>,
  text: string,
  record: T,
  index: number,
) {
  if (button.name === '删除') {
    Modal.confirm({
      title: '确定删除该项吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        return button.onClick && button.onClick(text, record, index);
      },
      onCancel: () => {
        // nothing todo
      },
    });
    return;
  }

  button.onClick && button.onClick(text, record, index);
}

function Table<T extends object = any>(props: TableProps<T>) {
  const {
    className,
    pagination,
    dataSource,
    columns,
    theme,
    renderCard,
    isListTheme,
    isCardTheme,
    loading,
    ...rest
  } = props;
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);

  const {
    total,
    pageSize,
    ...restPagination
  } = pagination as TablePaginationConfig;

  const size = useSize(wrapRef);
  const wrapHeight = size.height;

  React.useEffect(() => {
    const tbodyHeight
      = wrapRef.current?.querySelector('.ant-table-tbody')?.clientHeight || 0;

    // 为什么是减去 55 和 96 ?
    // 55 是表头的高度
    // 96 是底部分页信息的高度
    const y = wrapHeight ? wrapHeight - 55 - 96 : 0;
    setScrollY(tbodyHeight > y ? y : 0);
  }, [dataSource, size]);

  // 设置 renderButtons
  columns?.forEach((item) => {
    const {renderButtons} = item;

    if (!renderButtons) {
      return;
    }

    // eslint-disable-next-line react/display-name
    item.render = (text: string, record: T, index) => {
      let buttons: ActionButton<T> | Array<ActionButton<T>>;

      if (typeof renderButtons === 'function') {
        buttons = renderButtons(record);
      } else {
        buttons = renderButtons;
      }

      // 强制转变为数组
      if (!Array.isArray(buttons)) {
        buttons = [buttons];
      }

      const commonButtonProps = {
        size: 'small' as 'small',
        className: 'env-template-table-action-btn',
        type: 'link' as 'link',
      };

      if (buttons.length === 1) {
        const [button] = buttons;

        return (
          <Button
            {...commonButtonProps}
            onClick={() => handleActionButtonClick(button, text, record, index)}
          >
            {button.name}
          </Button>
        );
      }

      const [firstButton, ...restButtons] = buttons;

      return (
        <>
          <Button
            {...commonButtonProps}
            onClick={() =>
              handleActionButtonClick(firstButton, text, record, index)
            }
          >
            {firstButton.name}
          </Button>
          <Popover
            overlayClassName="env-template-table-action-popover"
            placement="bottomLeft"
            content={
              <List size="small">
                {restButtons.map((item, i) => (
                  <List.Item
                    key={i}
                    onClick={() =>
                      handleActionButtonClick(item, text, record, index)
                    }
                  >
                    {item.name}
                  </List.Item>
                ))}
              </List>
            }
          >
            <Button {...commonButtonProps}>
              更多
              <DownOutlined />
            </Button>
          </Popover>
        </>
      );
    };
  });

  /**
   * 设置卡片组件
   * 自动给卡片组件注入`record`, `index`属性
   * @param {T} record
   * @param {number} index
   * @return {React.FunctionComponentElement}
   */
  const renderCardComponent = (record: T, index: number) => {
    if (!renderCard) {
      return null;
    }

    const {rowSelection} = rest;
    let selectProps = {};

    if (!!rowSelection) {
      const {selectedRowKeys, onChange} = rowSelection;
      selectProps = {
        checked: selectedRowKeys.includes(index),
        onCheck: (value, index) => {
          if (!rest.rowSelection) {
            return;
          }

          const copySelectedRowKeys = [...selectedRowKeys];

          // 选择了某个卡片
          if (value) {
            copySelectedRowKeys.push(index);
          } else {
            // 取消选择了某个卡片
            const targetIndex = copySelectedRowKeys.findIndex(
              (item) => item === index,
            );
            copySelectedRowKeys.splice(targetIndex, 1);
          }

          const selectedRows: Array<T> = [];
          copySelectedRowKeys.sort();
          copySelectedRowKeys.forEach((item) => {
            const target = dataSource[item];
            selectedRows.push(target);
          });

          onChange && onChange(copySelectedRowKeys, selectedRows);
        },
      };
    }

    const cardComponent = renderCard(record, index);
    const propsCardComponent = React.cloneElement(cardComponent, {
      data: record,
      index,
      selectable: !!rowSelection,
      ...selectProps,
    });

    return propsCardComponent;
  };

  return (
    <div ref={wrapRef} className="env-template-table-wrap">
      {isListTheme && (
        <AntTable
          loading={loading}
          columns={columns?.filter((item) => item.isShow)}
          dataSource={dataSource}
          className={classnames(className, 'env-template-table')}
          scroll={scrollY ? {y: scrollY} : {}}
          {...rest}
          pagination={false}
        />
      )}

      {isCardTheme && (
        <div className="env-template-card-wrap">
          <Spin spinning={loading as boolean}>
            {dataSource.length === 0 ? (
              <Empty className="env-template-card-list-empty" />
            ) : (
              <ul className="env-template-card-list">
                {dataSource.map((item, index) => (
                  <li key={index} className="env-template-card-item">
                    <div className="env-template-card-container">
                      {renderCardComponent(item, index)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Spin>
        </div>
      )}

      <div className="env-template-table-pagination">
        <div className="env-template-table-total-number">总共{total}条记录</div>
        {total !== 0 && (
          <Pagination
            showQuickJumper
            total={total}
            pageSize={pageSize}
            {...restPagination}
          />
        )}
      </div>
    </div>
  );
}

export default Table;

Table.defaultProps = {
  theme: 'list',
};
