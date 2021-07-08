import React, {useContext} from 'react';
import {Layout, Tooltip, Menu, Dropdown} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {MenuContext} from './menu';
import {UPDATE_STATE} from './config';

export interface ActionBarProps {}

const {Header} = Layout;

const ActionBar: React.FC<ActionBarProps> = (props) => {
  const {state, dispatch} = useContext(MenuContext);
  const {collapsed} = state;

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="env-menu-action-bar">
      <div className="env-menu-action-bar-left">
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => {
              dispatch({type: UPDATE_STATE, payload: {collapsed: false}});
            }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => {
              dispatch({type: UPDATE_STATE, payload: {collapsed: true}});
            }}
          />
        )}
      </div>
      <div className="env-menu-action-bar-right">
        <Tooltip overlay="切换主题">
          <span className="env-menu-action-bar-icon">
            <i className="iconfont icon-qiehuan" />
          </span>
        </Tooltip>

        <Tooltip overlay="刷新">
          <span className="env-menu-action-bar-icon">
            <i className="iconfont icon-shuaxin1" />
          </span>
        </Tooltip>
        {/* <Tooltip overlay="切换主题">
          <span className="env-menu-action-bar-icon">
            <i className="iconfont icon-wenhao" />
          </span>
        </Tooltip> */}
        <Tooltip overlay="通知">
          <span className="env-menu-action-bar-icon">
            <i className="iconfont icon-xiaoxi" />
          </span>
        </Tooltip>
        <Dropdown overlay={content}>
          <span className="env-menu-action-bar-icon">
            <i className="iconfont icon-qiehuan1" />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default ActionBar;
