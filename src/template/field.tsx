import * as React from 'react';
import classnames from 'classnames';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
}

const Field: React.FC<FieldProps> = (props) => {
  const {label, children, className, ...rest} = props;

  return (
    <div className={classnames('env-template-card-field', className)} {...rest}>
      <div className="env-template-card-field__label">{label}</div>
      <div className="env-template-card-field__children">{children}</div>
    </div>
  );
};

export default Field;
