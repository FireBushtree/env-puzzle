import * as React from 'react';
import CheckRow from '../check-row';
import {fireEvent, render, screen} from '@testing-library/react';

const CHECK_ROW_CLASS = 'env-template-check-row';

describe('<CheckRow />', () => {
  test('default render is hidden', () => {
    const {container} = render(
      <CheckRow selectedRows={[]} clearSelectedRows={() => {}} />,
    );

    expect(container.querySelector(`.${CHECK_ROW_CLASS}`)).toBeTruthy();
    expect(container.querySelector(`.${CHECK_ROW_CLASS}.is-hide`)).toBeTruthy();
  });

  test('when has selectedRows, row will show', () => {
    const {container} = render(
      <CheckRow selectedRows={[{name: 'owen'}]} clearSelectedRows={() => {}} />,
    );

    expect(container.querySelector(`.${CHECK_ROW_CLASS}.is-hide`)).toBeFalsy();
    expect(container.querySelector(`.${CHECK_ROW_CLASS}`)).toBeTruthy();
  });

  test('on clear', () => {
    const clearFn = jest.fn();

    const {container, rerender} = render(
      <CheckRow selectedRows={[{name: 'owen'}]} clearSelectedRows={clearFn} />,
    );

    fireEvent.click(screen.getByText('清空'));
    rerender(<CheckRow selectedRows={[]} clearSelectedRows={clearFn} />);

    expect(container.querySelector(`.${CHECK_ROW_CLASS}.is-hide`)).toBeTruthy();
    clearFn.mock.calls.length = 1;
  });
});
