import React, {createContext, Dispatch, Reducer, useReducer} from 'react';
import {Layout} from 'antd';
import Side from './side';
import ActionBar from './action-bar';
import BreadCrumbs from './bread-crumbs';
import {useMount} from 'ahooks';
import DomUtil from '../utils/dom-util';
import {ICON_FONT_HREF, UPDATE_STATE} from './config';

export interface MenuProps {}

export interface MenuState {
  collapsed: boolean;
}

export interface MenuDispatchI {
  type: string;
  payload: {
    collapsed?: boolean;
  };
}

export interface MenuContextI {
  state: MenuState;
  dispatch: Dispatch<MenuDispatchI>;
}

export const MenuContext = createContext({} as MenuContextI);

const {Content} = Layout;

const reducer = (state: MenuState, action: any) => {
  const {type, payload} = action;

  switch (type) {
  case UPDATE_STATE:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

const Menu: React.FC<MenuProps> = (props) => {
  useMount(() => {
    DomUtil.loadCss(ICON_FONT_HREF, 'icon-font-href');
  });

  const [menuState, dispatch] = useReducer<Reducer<MenuState, MenuDispatchI>>(
    reducer,
    {
      collapsed: false,
    },
  );

  return (
    <MenuContext.Provider value={{state: menuState, dispatch}}>
      <div className="env-menu">
        <Layout className="env-menu-layout">
          <Side />
          <Layout>
            <ActionBar />
            <Content>
              <BreadCrumbs />
            </Content>
          </Layout>
        </Layout>
      </div>
    </MenuContext.Provider>
  );
};

export default Menu;
