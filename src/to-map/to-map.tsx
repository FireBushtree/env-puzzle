import {SendOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import BMap, {Point} from '../b-map';
import Container, {ContainerProps, ExportAttributes} from './container';

export interface ToMapProps
  extends Pick<ContainerProps, 'onChange' | 'center'> {
  value?: Point;
  onOk?: (value: Point) => any;
}

export interface ToMapControl {
  map: any;
}

const ToMap: React.ForwardRefRenderFunction<ToMapControl, ToMapProps> = (
  props: ToMapProps,
  ref,
) => {
  const {onChange, value, center, onOk} = props;

  const [map, setMap] = useState<any>();

  const containerRef = useRef<ExportAttributes>();

  /**
   * 选点位的点的值
   */
  const centerAndValue = value || center || BMap.defaultCenter;
  const [selfValue, setSelfValue] = useState<Point>(centerAndValue);

  useImperativeHandle(ref, () => ({
    map,
  }));

  return (
    <Container
      onOk={() => {
        onOk(selfValue);
      }}
      onMapCreate={(map) => setMap(map)}
      center={centerAndValue}
      ref={containerRef}
      onChange={(value) => {
        onChange && onChange(value);
        setSelfValue(value);
      }}
      headerBtns={
        <>
          <Button
            onClick={() => {
              const {map} = containerRef.current;
              const {lng, lat} = map.getCenter();
              setSelfValue({lng, lat});
            }}
          >
            <SendOutlined />
            校正
          </Button>
        </>
      }
    >
      <BMap.Marker
        zIndex={1}
        offset={{
          width: 0,
          height: -15,
        }}
        onDragend={(lng, lat) => {
          const point = {lng, lat};
          setSelfValue(point);
          onChange && onChange(point);
        }}
        lng={selfValue.lng}
        lat={selfValue.lat}
        icon={{
          url: require('./images/icon-picker.png'),
          width: 30,
          height: 30,
        }}
      />
    </Container>
  );
};

export default forwardRef(ToMap);
