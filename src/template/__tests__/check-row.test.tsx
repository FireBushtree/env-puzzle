import * as React from 'react';
import CheckRow from '../check-row';
import {render} from '@testing-library/react';

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
});
