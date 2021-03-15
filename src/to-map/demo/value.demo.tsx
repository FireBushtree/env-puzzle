import React, {useRef, useState} from 'react';
import {Card} from 'antd';
import {ToMap} from 'env-puzzle';

// @ts-ignore
import {Point} from 'env-puzzle/lib/b-map';

// @ts-ignore
import {ToMapControl} from 'env-puzzle/lib/to-map';

const ValueDemo: React.FC = () => {
  const [point, setPoint] = useState<
    Point & {
      address?: string;
    }
  >({
    lng: 120.59241231942377,
    lat: 31.303564845796398,
    address: '江苏省苏州市姑苏区三香路985号',
  });

  const toMapRef = useRef<ToMapControl>(null);

  return (
    <>
      {point && (
        <Card style={{width: 300}}>
          <p>经度: {point.lng}</p>
          <p>纬度: {point.lat}</p>
          <p>位置: {point.address}</p>
        </Card>
      )}
      <ToMap
        value={point}
        ref={toMapRef}
        onOk={(value) => {
          toMapRef.current.map.geocoder(value, (res: any) => {
            setPoint({
              ...value,
              address: res.address,
            });
          });
        }}
      />
    </>
  );
};

export default ValueDemo;
