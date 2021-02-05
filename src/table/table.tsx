import * as React from 'react';
import classnames from 'classnames';
import {Table as AntTable} from 'antd';
import {TableProps as AntTableProps} from 'antd/lib/table';

export interface TableProps<T> extends AntTableProps<T> {
  wrapClassName?: string;
  autoScroll?: boolean;
  onReachBottom?: (e: Event) => any;
  rowSpacing?: number;
}

/**
 * @param {*} props props
 * @return {jsx.Element}
 */
function Table<T extends object = any>(props: TableProps<T>) {
  let timer: any = null;

  const wrapRef = React.useRef<HTMLDivElement>(null);

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const {
    wrapClassName,
    dataSource,
    className,
    onReachBottom,
    autoScroll,
    rowSpacing,
    ...rest
  } = props;

  React.useEffect(() => {
    if (!props.autoScroll) {
      return;
    }

    const {current} = wrapRef;
    const wrapper = current?.querySelector('.ant-table-body');
    const table = wrapper?.querySelector('table');
    const tbody = table?.querySelector('tbody');

    if (!tbody || !table || !wrapper) {
      return;
    }

    if (!props.scroll?.y || tbody.scrollHeight <= props.scroll?.y) {
      return;
    }

    // 创建一个tbody的拷贝, 为了滑动时的流畅性
    // 去除上一次创建的拷贝
    const copyEl = table?.querySelector('.ant-table-tbody.copy');
    copyEl?.remove();

    // 创建新的dom
    // TODO: 操作了dom， 感觉性能不是很好可以优化
    const tbodyEl = document.createElement('tbody');
    tbodyEl.classList.add('ant-table-tbody');
    tbodyEl.classList.add('copy');
    tbodyEl.innerHTML = tbody.innerHTML;
    table?.appendChild(tbodyEl);

    // 设置滚动定时器
    clearTimer();
    timer = setInterval(() => {
      if (wrapper.scrollTop >= tbody.scrollHeight) {
        wrapper.scrollTop = 0;
      } else {
        wrapper.scrollTop++;
      }
    }, 20);

    return () => {
      clearTimer();
    };
  }, [dataSource]);

  const scrollEventCallback = React.useCallback((e: Event) => {
    const {current} = wrapRef;
    const wrapper = current?.querySelector('.ant-table-body');
    const table = wrapper?.querySelector('table');
    const tbody = table?.querySelector('tbody');

    if (!tbody || !table || !wrapper) {
      return;
    }

    if (wrapper.scrollTop === 0) {
      return;
    }

    if (wrapper.scrollTop + wrapper.clientHeight === tbody.scrollHeight) {
      onReachBottom && onReachBottom(e);
    }
  }, []);

  React.useEffect(() => {
    // 当自动滚动的时候或者没有设置该事件， 不触发`onReachBottom`事件
    if (!onReachBottom || autoScroll) {
      return;
    }

    const {current} = wrapRef;
    const wrapper = current?.querySelector('.ant-table-body');

    // 添加滚动监听事件
    wrapper.addEventListener('scroll', scrollEventCallback);

    return () => {
      wrapper.removeEventListener('scroll', scrollEventCallback);
    };
  }, [dataSource]);

  return (
    <div className={wrapClassName} ref={wrapRef}>
      <AntTable
        className={classnames('env-table', className, {
          'env-table__spacing': rowSpacing,
        })}
        pagination={false}
        dataSource={dataSource}
        {...rest}
      />
    </div>
  );
}

export default Table;
