import React from 'react';
import {Breadcrumb} from 'antd';

export interface BreadCrumbsProps {}

const BreadCrumbs: React.FC<BreadCrumbsProps> = (props) => {
  return (
    <div className="env-menu-bread-crumbs">
      <Breadcrumb>
        <Breadcrumb.Item>Application Center</Breadcrumb.Item>
        <Breadcrumb.Item>Application List</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>

      <span className="env-menu-bread-crumbs-close">
        <i className="iconfont icon-shanchu"></i>
      </span>
    </div>
  );
};

export default BreadCrumbs;
