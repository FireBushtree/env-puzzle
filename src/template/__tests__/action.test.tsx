import * as React from 'react';
import Action from '../action';
import {render, screen} from '@testing-library/react';

describe('<Action />', () => {
  test('default show render all buttons', () => {
    const component = render(
      <Action dataSource={[]} columns={[]} filter={{}} setColumns={() => {}} />,
    );
    const {container} = component;
    expect(container).toMatchSnapshot();

    expect(screen.getByText('新建')).toBeTruthy();
    expect(screen.getByText('删除')).toBeTruthy();
  });
});
