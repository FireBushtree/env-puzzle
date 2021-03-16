import React from 'react';

export interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = (props) => {
  return (
    <svg className="env-template-icon" aria-hidden="true">
      <use xlinkHref={`#${props.name}`}></use>
    </svg>
  );
};

export default Icon;
