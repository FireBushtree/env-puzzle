import React from 'react';
import {Checkbox, Modal} from 'antd';
import classnames from 'classnames';
import {CardActionButton, RenderCardButtons} from './table';
import {ExclamationCircleOutlined} from '@ant-design/icons';

export interface CardProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  data?: T;
  index?: number;
  checked?: boolean;
  selectable?: boolean;
  onCheck?: (value: boolean, index: number) => any;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  renderButtons?: RenderCardButtons<T>;
  children?: React.ReactNode;
}

function Card<T extends object = any>(props: CardProps<T>) {
  const {
    title,
    children,
    renderButtons,
    checked,
    data,
    selectable,
    onCheck,
    index,
    subTitle,
    className,
    ...rest
  } = props;

  let buttons: CardActionButton<T> | Array<CardActionButton<T>>;

  if (typeof renderButtons === 'function') {
    buttons = renderButtons(data);
  } else {
    buttons = renderButtons || [];
  }

  // 强制转变为数组
  if (buttons && !Array.isArray(buttons)) {
    buttons = [buttons];
  }

  const cardButtons = buttons as Array<CardActionButton<T>>;

  return (
    <div {...rest} className={classnames('env-template-card', className)}>
      <div className="env-template-card-header">
        <div className="env-template-card-header-title">{title}</div>
        {selectable && (
          <div className="env-template-card-header-select">
            <Checkbox
              checked={checked}
              onChange={(e) => {
                onCheck && onCheck(e.target.checked, index);
              }}
            />
          </div>
        )}
      </div>

      {subTitle && (
        <div className="env-template-card-sub-title">
          <span className="env-template-card-sub-title-inner">{subTitle}</span>
        </div>
      )}

      <div className="env-template-card-body">{children}</div>
      <div className="env-template-card-footer">
        <div className="env-template-card-footer-box">
          <span className="env-template-card-footer-point"></span>
          <span className="env-template-card-footer-point"></span>
          <span className="env-template-card-footer-point"></span>

          {cardButtons.map((item, buttonIndex) => (
            <span
              key={buttonIndex}
              className="env-template-card-footer-button"
              onClick={() => {
                if (item.name === '删除') {
                  Modal.confirm({
                    title: '确定删除该项吗？',
                    icon: <ExclamationCircleOutlined />,
                    onOk: () => {
                      return item.onClick && item.onClick(data, index);
                    },
                    onCancel: () => {
                      // nothing todo
                    },
                  });
                  return;
                }

                item.onClick && item.onClick(data, index);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
