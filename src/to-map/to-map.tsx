import {SendOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React, {useRef} from 'react';
import {Point} from '../b-map';
import Container, {ContainerProps, ExportAttributes} from './container';

export interface ToMapProps extends Pick<ContainerProps, 'onChange'> {
  value?: Point;
}

const ToMap: React.FC<ToMapProps> = (props: ToMapProps) => {
  const {onChange} = props;

  const containerRef = useRef<ExportAttributes>();

  return (
    <Container
      ref={containerRef}
      onChange={onChange}
      headerBtns={
        <>
          <Button
            onClick={() => {
              const {map, setSelfValue} = containerRef.current;
              const {lng, lat} = map.getCenter();
              setSelfValue({lng, lat});
            }}
          >
            <SendOutlined />
            校正
          </Button>
        </>
      }
    />
  );
};

export default ToMap;
