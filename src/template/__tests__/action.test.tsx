import * as React from 'react';
import Action from '../action';
import {render, screen} from '@testing-library/react';

const defaultActionProps = {
  selectRows: [],
  dataSource: [],
  columns: [],
  filter: {},
  setColumns: () => {},
  onSelectedRows: () => {},
};

const TABLE_BTN_CLASS = '.env-template-action-btn__table';
const EXPORT_BTN_CLASS = '.env-template-action-btn__export';

describe('<Action />', () => {
  test('default show render all buttons', () => {
    const component = render(<Action {...defaultActionProps} />);
    const {container} = component;
    expect(container).toMatchSnapshot();

    expect(screen.getByText('新建')).toBeTruthy();
    expect(screen.getByText('删除')).toBeTruthy();
    expect(screen.getByText('更多')).toBeTruthy();

    const tableBtn = container.querySelector(TABLE_BTN_CLASS);
    const exportBtn = container.querySelector(EXPORT_BTN_CLASS);

    expect(tableBtn).toBeTruthy();
    expect(exportBtn).toBeTruthy();
  });

  test('hide button', () => {
    const component = render(
      <Action
        {...defaultActionProps}
        createBtn={false}
        exportBtn={false}
        importBtn={false}
        deleteBtn={false}
      />,
    );

    const {container} = component;

    expect(screen.queryByText('新建')).toBeFalsy();
    expect(screen.queryByText('删除')).toBeFalsy();
    expect(screen.queryByText('更多')).toBeFalsy();

    const tableBtn = container.querySelector(TABLE_BTN_CLASS);
    const exportBtn = container.querySelector(EXPORT_BTN_CLASS);

    expect(tableBtn).toBeTruthy();
    expect(exportBtn).toBeFalsy();
  });

  test('moreButtons props will show more button', () => {
    render(
      <Action
        {...defaultActionProps}
        createBtn={false}
        exportBtn={false}
        importBtn={false}
        deleteBtn={false}
        moreButtons={[{name: '绑定信息', onClick: () => {}}]}
      />,
    );

    expect(screen.queryByText('更多')).toBeTruthy();
  });
});
