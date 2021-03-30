import React, {useEffect} from 'react';
import classnames from 'classnames';
import DomUtil from '../utils/dom-util';
export interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = (props) => {
  useEffect(() => {
    DomUtil.loadCss(
      '//at.alicdn.com/t/font_1231247_7mfybkm9fwl.css',
      'base-iconfont',
    );
  }, []);

  return <span className={classnames('iconfont', `${props.name}`)}></span>;
};

export default Icon;
