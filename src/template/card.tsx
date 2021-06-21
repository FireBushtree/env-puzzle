import React from 'react';
import {Checkbox} from 'antd';
import {CardActionButton, RenderCardButtons} from './table';

export interface CardProps<T> {
  data?: T;
  title?: React.ReactNode;
  renderButtons?: RenderCardButtons<T>;
  children?: React.ReactNode;
}

function Card<T extends object = any>(props: CardProps<T>) {
  const {title, children, renderButtons, data} = props;

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

  return (
    <div className="env-template-card">
      <div className="env-template-card-header">
        <div className="env-template-card-header-title">{title}</div>
        <div className="env-template-card-header-select">
          <Checkbox />
        </div>
      </div>
      <div className="env-template-card-body">{children}</div>
      <div className="env-template-card-footer">
        <div className="env-template-card-footer-box">
          <span className="env-template-card-footer-point"></span>
          <span className="env-template-card-footer-point"></span>
          <span className="env-template-card-footer-point"></span>

          {/* {buttons.map((item, index) => (
            <span
              key={index}
              className="env-template-card-footer-button"
              onClick={() => {
                item.onClick && item.onClick(data);
              }}
            >
              {item.name}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Card;
