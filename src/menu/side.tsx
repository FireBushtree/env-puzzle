import React, {useContext} from 'react';
import {Layout, Menu} from 'antd';
import {AppstoreOutlined} from '@ant-design/icons';
import {MenuContext} from './menu';

const {Sider} = Layout;
const {SubMenu} = Menu;

const Side: React.FC = () => {
  const {state} = useContext(MenuContext);
  const {collapsed} = state;

  return (
    <Sider collapsed={collapsed} width={256} className="env-menu-side">
      <div className="env-menu-side-header"></div>

      <div className="env-menu-side-content">
        <Menu mode="inline" theme="dark">
          <SubMenu
            key="sub1"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5 Option 5 Option 5 Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="7">Option 3</Menu.Item>
            <Menu.Item key="8">Option 4</Menu.Item>
            <SubMenu key="sub2-2" title="Submenu">
              <Menu.Item key="9">Option 5</Menu.Item>
              <Menu.Item key="10">Option 6</Menu.Item>
              <Menu.Item key="11">Option 6</Menu.Item>
              <Menu.Item key="12">Option 6</Menu.Item>
              <Menu.Item key="13">Option 6</Menu.Item>
              <Menu.Item key="14">Option 6</Menu.Item>
              <Menu.Item key="15">Option 6</Menu.Item>
              <Menu.Item key="16">Option 6</Menu.Item>
              <Menu.Item key="17">Option 6</Menu.Item>
              <Menu.Item key="18">Option 6</Menu.Item>
              <Menu.Item key="19">Option 129</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    </Sider>
  );
};

export default Side;
