import * as React from 'react';
import {Component} from 'react';
import {PageApiRes} from '../interface';
import Action, {ActionProps} from './action';
import CheckRow from './check-row';
import Filter, {FilterControl} from './filter';
import Table, {TableColumnType, TableProps} from './table';

export interface TemplatePagination {
  total: number;
  current: number;
  pageSize: number;
}

export interface TemplateProps<F, T> {
  actionProps?: Omit<
    ActionProps<F, T>,
    'columns' | 'setColumns' | 'selectable' | 'selectRows' | 'filter'
  >;
  tableProps: TableProps<T>;
  getDataSource: (
    pagination: TemplatePagination,
    filter: F,
  ) => Promise<PageApiRes<T>> | PageApiRes<T>;
}

export interface TemplateState<F, T> {
  /**
   * 当前的搜索条件
   */
  filter: F;

  /**
   * table的加载状态
   */
  loading: boolean;

  /**
   * 数据列表
   */
  dataSource: T[];

  /**
   * 选中的行的keys
   */
  selectedRowKeys: React.ReactText[];

  /**
   * 选中的行
   */
  selectedRows: T[];

  /**
   * 内部用来展示的columns
   */
  selfColumns: TableColumnType<T>;

  /**
   * 分页信息
   */
  pagination: TemplatePagination;
}

class Template<F, T extends object = any> extends Component<
  TemplateProps<F, T>,
  TemplateState<F, T>
> {
  filterRef: FilterControl;

  state = {
    filter: {},
    loading: false,
    dataSource: [],
    selfColumns: [],
    selectedRowKeys: [],
    selectedRows: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
  } as TemplateState<F, T>;

  componentDidMount() {
    this.updateFilter();
    this.setSelfColumns();
  }

  /**
   * 初始化columns, 给每个column加上是否显示的属性
   */
  setSelfColumns() {
    const {tableProps = {}} = this.props;
    const {columns = []} = tableProps;

    this.setState({
      selfColumns: columns.map((item) => ({
        ...item,
        isShow: true,
      })),
    });
  }

  updateFilter() {
    const filter = this.filterRef.form.getFieldsValue();
    this.setState(
        {
          filter,
        },
        () => {
          this.requestDataSource();
        },
    );
  }

  async requestDataSource() {
    const {getDataSource} = this.props;
    const {pagination, filter} = this.state;

    this.setState({loading: true});

    try {
      const res = await getDataSource(pagination, filter);
      const {total, rows} = res;
      this.setState({
        dataSource: rows,
        pagination: {
          ...pagination,
          total,
        },
      });
    } finally {
      this.setState({loading: false});
    }
  }

  setPagination(obj: Partial<TemplatePagination>) {
    this.setState(
        {
          pagination: {
            ...this.state.pagination,
            ...obj,
          },
        },
        () => {
          this.requestDataSource();
        },
    );
  }

  clearSelectedRows() {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
  }

  render() {
    const {
      filter,
      loading,
      dataSource,
      pagination,
      selfColumns,
      selectedRows,
      selectedRowKeys,
    } = this.state;

    const {tableProps = {}, actionProps, children} = this.props;
    const {
      // eslint-disable-next-line no-unused-vars
      columns,
      hasIndex,
      selectable,
      rowSelection,
      ...tableRestProps
    } = tableProps;

    const columnsToShow = selfColumns.filter((item) => item.isShow);

    // TODO: 这个地方写的不好
    // 给selfColumns补充`序号列`， 利用了react不会变动state的特性。
    if (hasIndex) {
      columnsToShow.unshift({
        title: '序号',
        key: 'index',
        isShow: true,
        render: (text: string, record: T, index) => {
          const {current, pageSize} = pagination;
          return (current - 1) * pageSize + index + 1;
        },
      });
    }

    return (
      <div className="env-template">
        <div className="env-template__search">
          <Filter
            ref={(ref) => (this.filterRef = ref)}
            onSearch={() => {
              this.updateFilter();
            }}
            onReset={() => {
              this.filterRef.form.resetFields();
              this.updateFilter();
            }}
          >
            {children}
          </Filter>

          <Action
            {...actionProps}
            filter={filter}
            selectable={selectable}
            selectRows={selectedRows}
            columns={selfColumns}
            setColumns={(columns) => {
              this.setState({selfColumns: columns});
            }}
          />

          <CheckRow
            selectedRows={selectedRows}
            clearSelectedRows={() => this.clearSelectedRows()}
          />
        </div>

        <div className="env-template__table">
          <Table
            loading={loading}
            rowSelection={
              selectable ?
                {
                  ...rowSelection,
                  selectedRowKeys: selectedRowKeys,
                  onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                      selectedRowKeys,
                      selectedRows,
                    });
                  },
                } :
                undefined
            }
            rowKey="id"
            pagination={{
              ...pagination,
              onChange: (val) => {
                if (val === pagination.current) {
                  return;
                }

                this.setPagination({
                  current: val,
                });
              },
              onShowSizeChange: (current, size) => {
                if (size === pagination.pageSize) {
                  return;
                }

                this.setPagination({
                  pageSize: size,
                });
              },
            }}
            dataSource={dataSource}
            columns={columnsToShow}
            {...tableRestProps}
          />
        </div>
      </div>
    );
  }
}

export default Template;
