import * as React from 'react';
import {useSize} from 'ahooks';
import classnames from 'classnames';
import {Table as AntTable, Pagination, Modal} from 'antd';
import {
  TablePaginationConfig,
  TableProps as AntTableProps,
  ColumnGroupType,
  ColumnType,
} from 'antd/lib/table';
import {Button, Popover, List} from 'antd';
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

export interface ActionButton<T> {
  name: string;
  onClick?: (text: string, record: T, index: number) => any;
}

export type TableColumnType<T> = ((ColumnGroupType<T> | ColumnType<T>) & {
  isShow?: boolean;
  renderButtons?:
    | ActionButton<T>
    | Array<ActionButton<T>>
    | ((row: T) => ActionButton<T> | Array<ActionButton<T>>);
})[];

export interface TableProps<T> extends Omit<AntTableProps<T>, 'columns'> {
  hasIndex?: boolean;
  selectable?: boolean;
  columns?: TableColumnType<T>;
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
  const {className, pagination, dataSource, columns, ...rest} = props;
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

  return (
    <div ref={wrapRef} className="env-template-table-wrap">
      <AntTable
        columns={columns?.filter((item) => item.isShow)}
        dataSource={dataSource}
        className={classnames(className, 'env-template-table')}
        scroll={scrollY ? {y: scrollY} : {}}
        {...rest}
        pagination={false}
      />
      <div className="env-template-table-pagination">
        <div className="env-template-table-total-number">总共{total}条记录</div>
        <Pagination
          showQuickJumper
          total={total}
          pageSize={pageSize}
          {...restPagination}
        />
      </div>
    </div>
  );
}

export default Table;
